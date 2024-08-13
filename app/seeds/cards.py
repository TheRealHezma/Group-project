from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
    card1 = Card(
        title='Phase 1C',
        list_id=1,
        description='Get things started'
    )
    card2 = Card(
        title='Phase 2C',
        list_id=1,
        description='Get things moving'
    )
    card3 = Card(
        title='Phase 3C',
        list_id=1,
        description='Get things finished'
    )
    card4 = Card(
        title='Phase 1B',
        list_id=2,
        description='Get things started'
    )
    card5 = Card(
        title='Phase 2B',
        list_id=2,
        description='Get things moving'
    )
    card6 = Card(
        title='Phase 3B',
        list_id=2,
        description='Get things finished'
    )
    card7 = Card(
        title='Phase 1A',
        list_id=3,
        description='Get things started'
    )
    card8 = Card(
        title='Phase 2A',
        list_id=3,
        description='Get things moving'
    )
    card9 = Card(
        title='Phase 3A',
        list_id=3,
        description='Get things finished'
    )
    card10 = Card(
        title='Phase 1C',
        list_id=4,
        description='Get things started'
    )
    card11 = Card(
        title='Phase 2C',
        list_id=4,
        description='Get things started'
    )
    card12 = Card(
        title='Phase 3C',
        list_id=4,
        description='Get things moving'
    )
    card13 = Card(
        title='Phase 1B',
        list_id=5,
        description='Get things finished'
    )
    card14 = Card(
        title='Phase 2B',
        list_id=5,
        description='Get things started'
    )
    card15 = Card(
        title='Phase 3B',
        list_id=5,
        description='Get things moving'
    )
    card16 = Card(
        title='Phase 1A',
        list_id=6,
        description='Get things finished'
    )
    card17 = Card(
        title='Phase 2A',
        list_id=6,
        description='Get things started'
    )
    card18 = Card(
        title='Phase 3A',
        list_id=6,
        description='Get things moving'
    )
    card19 = Card(
        title='Phase 1C',
        list_id=7,
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
    db.session.add(card10)    
    db.session.add(card11)
    db.session.add(card12)
    db.session.add(card13)
    db.session.add(card14)
    db.session.add(card15)
    db.session.add(card16)
    db.session.add(card17)
    db.session.add(card18)
    db.session.add(card19)
    
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
