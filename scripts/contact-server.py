#!/usr/bin/env python3
"""Private SMTP bridge for the public contact form (Python standard library)."""
import ipaddress
import json
import os
import re
import smtplib
import ssl
import threading
import time
from collections import deque
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

EMAIL = re.compile(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}\Z")


def validate(data):
    if not isinstance(data, dict):
        raise ValueError('Invalid object')
    values = {}
    for key, limit in [('name', 100), ('email', 254), ('message', 2000)]:
        value = data.get(key)
        if not isinstance(value, str) or not value.strip() or len(value) > limit:
            raise ValueError('Invalid field')
        values[key] = value.strip()
    if any(ord(c) < 32 or ord(c) == 127 for c in values['name']):
        raise ValueError('Invalid name')
    if not EMAIL.fullmatch(values['email']):
        raise ValueError('Invalid email')
    if '\x00' in values['message']:
        raise ValueError('Invalid message')
    return values


def send_contact(data, config):
    mail = EmailMessage()
    mail['From'] = config['CONTACT_FROM']
    mail['To'] = config['CONTACT_TO']
    mail['Reply-To'] = data['email']
    mail['Subject'] = 'DartLink — Nouveau message du site'
    mail.set_content(f"Nom : {data['name']}\nAdresse de réponse : {data['email']}\n\n{data['message']}\n")
    with smtplib.SMTP_SSL(config['CONTACT_SMTP_HOST'], int(config['CONTACT_SMTP_PORT']),
                          context=ssl.create_default_context(), timeout=12) as smtp:
        smtp.login(config['CONTACT_SMTP_USER'], config['CONTACT_SMTP_PASSWORD'])
        refused = smtp.send_message(mail, from_addr=config['CONTACT_FROM'], to_addrs=[config['CONTACT_TO']])
        if refused:
            raise smtplib.SMTPException('Recipient refused')


class Limiter:
    def __init__(self):
        self.lock = threading.Lock()
        self.clients = {}
        self.global_times = deque()

    def allow(self, client):
        now = time.monotonic()
        with self.lock:
            self.clients = {k: v for k, v in self.clients.items() if v and v[-1] > now - 600}
            while self.global_times and self.global_times[0] <= now - 600:
                self.global_times.popleft()
            times = self.clients.get(client, deque())
            while times and times[0] <= now - 600:
                times.popleft()
            if len(times) >= 5 or len(self.global_times) >= 50:
                return False
            times.append(now)
            self.clients[client] = times
            self.global_times.append(now)
            return True


class ContactServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address, config, sender=send_contact):
        super().__init__(address, ContactHandler)
        self.config = config
        self.sender = sender
        self.limiter = Limiter()
        self.slots = threading.BoundedSemaphore(8)


class ContactHandler(BaseHTTPRequestHandler):
    server_version = 'DartLinkContact'

    def log_message(self, *args):
        pass  # Neither personal data nor request headers enter access logs.

    def reply(self, code, message):
        body = json.dumps({'ok': code == 200, 'message': message}).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        if code == 429:
            self.send_header('Retry-After', '600')
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        self.connection.settimeout(5)
        if self.path != '/api/contact':
            return self.reply(404, 'Introuvable.')
        if self.headers.get('Origin') != self.server.config['CONTACT_ORIGIN']:
            return self.reply(403, 'Origine refusée.')
        if self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
            return self.reply(415, 'Format refusé.')
        try:
            length = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            return self.reply(400, 'Requête invalide.')
        if not 0 < length <= 12000:
            return self.reply(413, 'Message trop volumineux.')
        try:
            client = str(ipaddress.ip_address(self.headers.get('X-Real-IP', self.client_address[0])))
        except ValueError:
            return self.reply(400, 'Requête invalide.')
        if not self.server.limiter.allow(client):
            return self.reply(429, 'Trop de tentatives. Réessayez dans dix minutes.')
        if not self.server.slots.acquire(blocking=False):
            return self.reply(503, 'Service momentanément indisponible.')
        try:
            try:
                data = json.loads(self.rfile.read(length))
                values = validate(data)
                if not isinstance(data.get('website', ''), str):
                    raise ValueError('Invalid honeypot')
            except (ValueError, UnicodeError, OSError):
                return self.reply(400, 'Vérifiez les champs du formulaire.')
            if data.get('website', ''):
                return self.reply(200, 'Message pris en compte.')
            try:
                self.server.sender(values, self.server.config)
            except Exception:
                print('Contact: SMTP delivery failed; no personal data logged.', flush=True)
                return self.reply(502, 'L’envoi a échoué. Réessayez dans quelques instants.')
            return self.reply(200, 'Votre message a été envoyé. Merci !')
        finally:
            self.server.slots.release()


def settings():
    keys = ['CONTACT_SMTP_HOST', 'CONTACT_SMTP_PORT', 'CONTACT_SMTP_USER',
            'CONTACT_SMTP_PASSWORD', 'CONTACT_FROM', 'CONTACT_TO', 'CONTACT_ORIGIN']
    config = {key: os.environ.get(key, '').strip() for key in keys}
    if not all(config.values()):
        raise ValueError('Missing private contact configuration')
    if not EMAIL.fullmatch(config['CONTACT_FROM']) or not EMAIL.fullmatch(config['CONTACT_TO']):
        raise ValueError('Invalid configured email address')
    if not config['CONTACT_ORIGIN'].startswith('https://'):
        raise ValueError('HTTPS origin required')
    if not 1 <= int(config['CONTACT_SMTP_PORT']) <= 65535:
        raise ValueError('Invalid SMTP port')
    return config


if __name__ == '__main__':
    ContactServer(('127.0.0.1', 4180), settings()).serve_forever()
