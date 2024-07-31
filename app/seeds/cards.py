from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
    card1 = Card(
        title='Phase 1',
        list_id=1,
        description='Get things started'
    )
    card2 = Card(
        title='Phase 2',
        list_id=1,
        description='Get things moving'
    )
    card3 = Card(
        title='Phase 3',
        list_id=1,
        description='Get things finished'
    )
    card4 = Card(
        title='Phase 1',
        list_id=2,
        description='Get things started'
    )
    card5 = Card(
        title='Phase 2',
        list_id=2,
        description='Get things moving'
    )
    card6 = Card(
        title='Phase 3',
        list_id=2,
        description='Get things finished'
    )
    card7 = Card(
        title='Phase 1',
        list_id=3,
        description='Get things started'
    )
    card8 = Card(
        title='Phase 2',
        list_id=3,
        description='Get things moving'
    )
    card9 = Card(
        title='Phase 3',
        list_id=3,
        description='Get things finished'
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)
    db.session.add(card7)
    db.session.add(card8)
    db.session.add(card9)

    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
