from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text


def seed_lists():
    ListOne = List(
        name='Test 1', board_id=1)
    ListTwo = List(
        name='Test 2', board_id=1)
    ListThree = List(
        name='Test 3', board_id=1)
    ListOneb = List(
        name='Test 1a', board_id=2)
    ListTwob = List(
        name='Test 2a', board_id=2)
    ListThreeb = List(
        name='Test 3a', board_id=2)
    ListOnec = List(
        name='Test 1b', board_id=3)
    ListTwoc = List(
        name='Test 2b', board_id=3)
    ListThreec = List(
        name='Test 3b', board_id=3)

    db.session.add(ListOne)
    db.session.add(ListTwo)
    db.session.add(ListThree)
    db.session.add(ListOneb)
    db.session.add(ListTwob)
    db.session.add(ListThreeb)
    db.session.add(ListOnec)
    db.session.add(ListTwoc)
    db.session.add(ListThreec)
    
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
