from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text


def seed_lists():
    ListOne = List(
        name='Test 1', board_id=1)
    ListTwo = List(
        name='Test 2', board_id=2)
    ListThree = List(
        name='Test 3', board_id=3)

    db.session.add(ListOne)
    db.session.add(ListTwo)
    db.session.add(ListThree)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
