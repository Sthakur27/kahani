"""Seed the database with the sample stories in seed_data/.

Usage, from the backend directory:

    ./venv/bin/python seed.py           # add the sample stories
    ./venv/bin/python seed.py --reset   # delete every story first, then add them

Each file in seed_data/ is one story:

    {
      "title": "...",
      "intro": "...",
      "options": [
        {"text": "...", "paragraph": "...", "children": [...]}
      ]
    }

Options nest to any depth through "children"; a leaf is an ending.
"""

import json
import sys
from pathlib import Path

from app import create_app, db
from app.models import Option, Story

SEED_DIR = Path(__file__).parent / "seed_data"

TITLE_MAX = 100
TEXT_MAX = 200


def load_stories():
    files = sorted(SEED_DIR.glob("*.json"))
    if not files:
        sys.exit(f"No seed files found in {SEED_DIR}")
    return [(f.name, json.loads(f.read_text())) for f in files]


def validate(name, data):
    """Fail loudly on bad seed data rather than half-seeding the database."""
    for key in ("title", "intro", "options"):
        if key not in data:
            sys.exit(f"{name}: missing top-level key {key!r}")
    if len(data["title"]) > TITLE_MAX:
        sys.exit(f"{name}: title is {len(data['title'])} chars, max is {TITLE_MAX}")

    def walk(options, path):
        count = 0
        for i, option in enumerate(options):
            where = f"{path}[{i}]"
            for key in ("text", "paragraph", "children"):
                if key not in option:
                    sys.exit(f"{name}: {where} missing key {key!r}")
            if len(option["text"]) > TEXT_MAX:
                sys.exit(
                    f"{name}: {where} text is {len(option['text'])} chars, "
                    f"max is {TEXT_MAX}"
                )
            count += 1 + walk(option["children"], f"{where}.children")
        return count

    return walk(data["options"], "options")


def insert_options(options, story_id, parent_id=None):
    for option in options:
        row = Option(
            text=option["text"],
            paragraph=option["paragraph"],
            story_id=story_id,
            parent_option_id=parent_id,
        )
        db.session.add(row)
        db.session.flush()  # assign row.id so children can point at it
        insert_options(option["children"], story_id, row.id)


def seed(reset=False):
    stories = load_stories()
    for name, data in stories:
        validate(name, data)

    app = create_app()
    with app.app_context():
        if reset:
            existing = Story.query.all()
            for story in existing:
                # Per-row delete, not Story.query.delete(): the bulk form skips
                # the ORM cascade and leaves options orphaned against a NOT NULL
                # story_id.
                db.session.delete(story)
            db.session.commit()
            print(f"Deleted {len(existing)} existing stories")

        for name, data in stories:
            story = Story(title=data["title"], intro=data["intro"])
            db.session.add(story)
            db.session.flush()
            insert_options(data["options"], story.id)
            db.session.commit()
            total = Option.query.filter_by(story_id=story.id).count()
            print(f"{name}: {story.title!r} (id {story.id}, {total} options)")

        print(
            f"\n{Story.query.count()} stories and "
            f"{Option.query.count()} options in the database"
        )


if __name__ == "__main__":
    seed(reset="--reset" in sys.argv)
