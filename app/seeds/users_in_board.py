from app.models import db, UserInBoard, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users_in_board():
    uib1 = UserInBoard(
        user_id=2,
        board_id=1
    )
    uib2 = UserInBoard(
        user_id=3,
        board_id=1
    )
    uib3 = UserInBoard(
        user_id=2,
        board_id=2
    )
    uib4 = UserInBoard(
        user_id=3,
        board_id=2
    )
    uib5 = UserInBoard(
        user_id=1,
        board_id=3
    )
    uib6 = UserInBoard(
        user_id=3,
        board_id=3
    )
    uib7 = UserInBoard(
        user_id=1,
        board_id=4
    )
    uib8 = UserInBoard(
        user_id=3,
        board_id=4
    )
    uib9 = UserInBoard(
        user_id=1,
        board_id=5
    )
    uib10 = UserInBoard(
        user_id=2,
        board_id=5,
    )
    uib11 = UserInBoard(
        user_id=1,
        board_id=6,
    )
    uib12 = UserInBoard(
        user_id=2,
        board_id=6,
    )

    db.session.add(uib1)
    db.session.add(uib2)
    db.session.add(uib3)
    db.session.add(uib4)
    db.session.add(uib5)
    db.session.add(uib6)
    db.session.add(uib7)
    db.session.add(uib8)
    db.session.add(uib9)
    db.session.add(uib10)
    db.session.add(uib11)
    db.session.add(uib12)

    db.session.commit()

def undo_users_in_board():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users_in_board RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_in_board"))

    db.session.commit()
