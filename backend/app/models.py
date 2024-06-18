# app/models.py
from . import db


class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    intro = db.Column(db.Text, nullable=False)
    options = db.relationship("Option", backref="story", lazy=True)


class Option(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    paragraph = db.Column(db.Text, nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey("story.id"), nullable=False)
    parent_option_id = db.Column(db.Integer, db.ForeignKey("option.id"), nullable=True)
    children = db.relationship("Option")
