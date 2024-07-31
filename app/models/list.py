from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    # might fail if we try to migrate if we dont have board table
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship with card
    Cards = db.relationship('Card', backref='list', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'board_id': self.board_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
