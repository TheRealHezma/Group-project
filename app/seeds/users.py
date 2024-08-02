from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash

def seed_users():
    users = [
        {
            "username": "Demo",
            "email": "demo@aa.io",
            "password": generate_password_hash("password")
        },
        {
            "username": "marnie",
            "email": "marnie@aa.io",
            "password": generate_password_hash("password")
        },
        {
            "username": "bobbie",
            "email": "bobbie@aa.io",
            "password": generate_password_hash("password")
        }
    ]


    for user_data in users:
        new_user = User(
            username=user_data["username"],
            email=user_data["email"],
            hashed_password=user_data["password"]
        )
        db.session.add(new_user)

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f'TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM users'))
    db.session.commit()
