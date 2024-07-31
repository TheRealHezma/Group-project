from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship with card_tasks
    tasks = db.relationship('CardTask', backref='card', lazy=True)
    comments = db.relationship('Comment', backref='card', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'list_id': self.list_id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
