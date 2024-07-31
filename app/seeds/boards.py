from app.models import db, Board, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_boards():
    board1 = Board(
        owner_id=1,
        name='ProjectX',
        description='Some kind of secret project',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    board2 = Board(
        owner_id=1,
        name='Infinity',
        description='The never ending project',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    board3 = Board(
        owner_id=2,
        name='Global Dominance',
        description='A secret plan to control the world',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    board4 = Board(
        owner_id=2,
        name='ProjectY',
        description='Another secret project',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    board5 = Board(
        owner_id=3,
        name='My Team',
        description='We are a team that does things',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    board6 = Board(
        owner_id=3,
        name='Outer Space',
        description='Exploring the expanse of the universe',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)

    db.session.commit()
# Using
def undo_boards():
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM boards'))

    db.session.commit()
