# app/routes.py
from flask import Blueprint, request, jsonify
from . import db
from .models import Story, Option

main = Blueprint("main", __name__)


# Create a new story
@main.route("/stories", methods=["POST"])
def create_story():
    data = request.get_json()
    new_story = Story(title=data["title"], intro=data["intro"])
    db.session.add(new_story)
    db.session.commit()
    return (
        jsonify(
            {"id": new_story.id, "title": new_story.title, "intro": new_story.intro}
        ),
        201,
    )


# Get a single story by ID
@main.route("/stories/<int:story_id>", methods=["GET"])
def get_story(story_id):
    story = Story.query.get_or_404(story_id)
    options = Option.query.filter_by(story_id=story_id, parent_option_id=None).all()
    return jsonify(
        {
            "id": story.id,
            "title": story.title,
            "intro": story.intro,
            "options": [{"id": opt.id, "text": opt.text} for opt in options],
        }
    )


# Update a story by ID
@main.route("/stories/<int:story_id>", methods=["PUT"])
def update_story(story_id):
    data = request.get_json()
    story = Story.query.get_or_404(story_id)
    story.title = data.get("title", story.title)
    story.intro = data.get("intro", story.intro)
    db.session.commit()
    return jsonify({"id": story.id, "title": story.title, "intro": story.intro})


# Delete a story by ID
@main.route("/stories/<int:story_id>", methods=["DELETE"])
def delete_story(story_id):
    story = Story.query.get_or_404(story_id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({"message": "Story deleted successfully"})


# Get all top-level stories
@main.route("/stories", methods=["GET"])
def get_stories():
    stories = Story.query.with_entities(Story.id, Story.title).all()
    return jsonify([{"id": story.id, "title": story.title} for story in stories])


@main.route("/options", methods=["POST"])
def create_option():
    data = request.get_json()
    new_option = Option(
        text=data["text"],
        paragraph=data["paragraph"],
        story_id=data["story_id"],
        parent_option_id=data.get("parent_option_id"),
    )
    db.session.add(new_option)
    db.session.commit()
    return jsonify(
        {
            "id": new_option.id,
            "text": new_option.text,
            "paragraph": new_option.paragraph,
            "parentOptionId": new_option.parent_option_id,
            "childOptions": [],
        }
    )


# Update an option by ID
@main.route("/options/<int:option_id>", methods=["PUT"])
def update_option(option_id):
    data = request.get_json()
    option = Option.query.get_or_404(option_id)
    option.text = data.get("text", option.text)
    option.paragraph = data.get("paragraph", option.paragraph)
    db.session.commit()
    return jsonify(
        {"id": option.id, "text": option.text, "paragraph": option.paragraph}
    )


# Get a single option by ID
@main.route("/options/<int:option_id>", methods=["GET"])
def get_option(option_id):
    option = Option.query.get_or_404(option_id)
    child_options = (
        Option.query.filter_by(parent_option_id=option_id)
        .with_entities(Option.id, Option.text)
        .all()
    )

    return jsonify(
        {
            "id": option.id,
            "text": option.text,
            "paragraph": option.paragraph,
            "parentOptionId": option.parent_option_id,
            "childOptions": [
                {
                    "id": child.id,
                    "text": child.text,
                }
                for child in child_options
            ],
        }
    )


# Register blueprint in your Flask app configuration
# from .routes import main as main_routes
# app.register_blueprint(main_routes)
