import importlib.util
import json
import smtplib
import threading
import unittest
import urllib.error
import urllib.request
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('contact', Path(__file__).parents[1] / 'scripts/contact-server.py')
contact = importlib.util.module_from_spec(spec)
spec.loader.exec_module(contact)
CONFIG = {'CONTACT_ORIGIN': 'https://example.test', 'CONTACT_FROM': 'sender@example.test',
          'CONTACT_TO': 'owner@example.test', 'CONTACT_SMTP_HOST': 'smtp.example.test',
          'CONTACT_SMTP_PORT': '465', 'CONTACT_SMTP_USER': 'sender@example.test',
          'CONTACT_SMTP_PASSWORD': 'temporary-test-value'}
DATA = {'name': 'Personne fictive', 'email': 'visitor@example.test', 'message': 'Projet fictif', 'website': ''}


class ContactTests(unittest.TestCase):
    def setUp(self):
        self.sent = []
        self.server = contact.ContactServer(('127.0.0.1', 0), CONFIG, lambda data, config: self.sent.append(data))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def request(self, data=DATA, origin='https://example.test', content_type='application/json'):
        req = urllib.request.Request(f'http://127.0.0.1:{self.server.server_port}/api/contact',
                                     data=json.dumps(data).encode(), headers={'Origin': origin, 'Content-Type': content_type})
        try:
            response = urllib.request.urlopen(req, timeout=5)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, json.loads(response.read())

    def test_success_sends_only_validated_fields(self):
        code, body = self.request({**DATA, 'to': 'attacker@example.test'})
        self.assertEqual(code, 200)
        self.assertTrue(body['ok'])
        self.assertEqual(self.sent, [{key: DATA[key] for key in ['name', 'email', 'message']}])

    def test_invalid_origin_or_type_cannot_send(self):
        self.assertEqual(self.request(origin='https://attacker.test')[0], 403)
        self.assertEqual(self.request(content_type='text/plain')[0], 415)
        self.assertEqual(self.sent, [])

    def test_invalid_fields_and_header_injection_cannot_send(self):
        for change in [{'email': 'a@example.test\r\nBcc:b@example.test'}, {'name': 'x\ny'},
                       {'message': ' '}, {'message': 'x' * 2001}]:
            self.assertEqual(self.request({**DATA, **change})[0], 400)
        self.assertEqual(self.sent, [])

    def test_oversized_request_is_rejected(self):
        self.assertEqual(self.request({**DATA, "message": "x" * 13000})[0], 413)
        self.assertEqual(self.sent, [])

    def test_honeypot_is_discarded(self):
        self.assertEqual(self.request({**DATA, 'website': 'spam.test'})[0], 200)
        self.assertEqual(self.sent, [])

    def test_rate_limit(self):
        for _ in range(5):
            self.assertEqual(self.request()[0], 200)
        self.assertEqual(self.request()[0], 429)
        self.assertEqual(len(self.sent), 5)

    def test_delivery_failure_is_not_success(self):
        def fail(*args):
            raise smtplib.SMTPException('temporary failure')
        self.server.sender = fail
        code, body = self.request()
        self.assertEqual(code, 502)
        self.assertFalse(body['ok'])

    @patch.object(contact.smtplib, 'SMTP_SSL')
    def test_mail_uses_fixed_recipient_and_visitor_reply_address(self, smtp):
        smtp.return_value.__enter__.return_value.send_message.return_value = {}
        contact.send_contact(contact.validate(DATA), CONFIG)
        call = smtp.return_value.__enter__.return_value.send_message.call_args
        mail = call.args[0]
        self.assertEqual(mail['To'], CONFIG['CONTACT_TO'])
        self.assertEqual(mail['From'], CONFIG['CONTACT_FROM'])
        self.assertEqual(mail['Reply-To'], DATA['email'])
        self.assertEqual(call.kwargs['to_addrs'], [CONFIG['CONTACT_TO']])


if __name__ == '__main__':
    unittest.main()
