# app/routes.py
from flask import Blueprint, jsonify
from .models import Story, Option

main = Blueprint("main", __name__)


@main.route("/test_db")
def test_db():
    try:
        stories_count = Story.query.count()
        return (
            jsonify(
                {
                    "message": f"Success! There are {stories_count} stories in the database."
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
