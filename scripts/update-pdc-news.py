#!/usr/bin/env python3
"""Write a small, attributed JSON snapshot from the official PDC RSS feed."""

import argparse
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import tempfile
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

FEED_URL = "https://www.pdc.tv/rss.xml"


class FirstImage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.source = None

    def handle_starttag(self, tag, attrs):
        if tag == "img" and self.source is None:
            self.source = dict(attrs).get("src")


def thumbnail_from_description(description):
    parser = FirstImage()
    parser.feed(description or "")
    url = urlparse(parser.source or "")
    match = re.fullmatch(r"/fit-in/\d+x\d+/([a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp))", url.path, re.IGNORECASE)
    if url.scheme != "https" or url.hostname != "images.gc.pdcservices.co.uk" or not match:
        return None
    return f"https://images.gc.pdcservices.co.uk/fit-in/320x180/{match.group(1)}"


def fetch_items():
    request = Request(FEED_URL, headers={"User-Agent": "DartLink-news/1.0"})
    with urlopen(request, timeout=15) as response:
        document = response.read(2_000_001)
    if len(document) > 2_000_000:
        raise ValueError("RSS feed exceeds size limit")
    root = ET.fromstring(document)
    items = []
    seen = set()
    for entry in root.findall("./channel/item"):
        title = (entry.findtext("title") or "").strip()
        link = (entry.findtext("link") or "").strip()
        published = (entry.findtext("pubDate") or "").strip()
        url = urlparse(link)
        if (
            not title or len(title) > 250 or link in seen
            or url.scheme != "https" or url.hostname != "www.pdc.tv"
            or not url.path.startswith("/news/")
        ):
            continue
        try:
            date = parsedate_to_datetime(published).astimezone(timezone.utc)
        except (TypeError, ValueError):
            continue
        item = {"title": title, "url": link, "publishedAt": date.isoformat()}
        thumbnail = thumbnail_from_description(entry.findtext("description"))
        if thumbnail:
            item["thumbnail"] = thumbnail
        items.append(item)
        seen.add(link)
        if len(items) == 6:
            break
    if not items:
        raise ValueError("RSS feed contains no valid PDC news items")
    return items


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    data = {
        "source": "PDC",
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "items": fetch_items(),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=".pdc-news-", dir=args.output.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, separators=(",", ":"))
            file.write("\n")
        os.chmod(temporary, 0o644)
        os.replace(temporary, args.output)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    print(f"{len(data['items'])} PDC headlines written to {args.output}")


if __name__ == "__main__":
    main()
