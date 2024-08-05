from app.models import db, Board, UserInBoard, environment, SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text


def seed_boards():
    boards = [
        {
            "owner_id": 1,
            "name": "ProjectX",
            "description": "Some kind of secret project"
        },
        {
            "owner_id": 1,
            "name": "Infinity",
            "description": "The never ending project"
        },
        {
            "owner_id": 2,
            "name": "Global Dominance",
            "description": "A secret plan to control the world"
        },
        {
            "owner_id": 2,
            "name": "ProjectY",
            "description": "Another secret project"
        },
        {
            "owner_id": 3,
            "name": "My Team",
            "description": "We are a team that does things"
        },
        {
            "owner_id": 3,
            "name": "Outer Space",
            "description": "Exploring the expanse of the universe"
        },
        {
            "owner_id": 3,
            "name": "Outer Space Part 2",
            "description": "Test forbidden"
        }
    ]

    for board_data in boards:
        new_board = Board(
            owner_id=board_data["owner_id"],
            name=board_data["name"],
            description=board_data["description"],
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )

        db.session.add(new_board)
        db.session.flush()  # Assigns an ID to new_board without committing

        owner_in_board = UserInBoard(
            board_id=new_board.id,
            user_id=board_data["owner_id"]
        )

        db.session.add(owner_in_board)

    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}.users_in_board RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM boards'))
        db.session.execute(text('DELETE FROM users_in_board'))
    db.session.commit()
