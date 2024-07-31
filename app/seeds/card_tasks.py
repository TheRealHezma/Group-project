from app.models import db, CardTask, environment, SCHEMA
from sqlalchemy.sql import text


def seed_card_tasks():
    task1 = CardTask(
        card_id=1,
        description='Do thing one',
        completed=False,
    )
    task2 = CardTask(
        card_id=2,
        description='Do thing one',
        completed=False,
    )
    task3 = CardTask(
        card_id=2,
        description='Do thing two',
        completed=False,
    )
    task4 = CardTask(
        card_id=3,
        description='Do thing one',
        completed=False,
    )
    task5 = CardTask(
        card_id=4,
        description='Do thing one',
        completed=False,

    )
    task6 = CardTask(
        card_id=5,
        description='Do thing one',
        completed=False,

    )
    task7 = CardTask(
        card_id=6,
        description='Do thing one',
        completed=False,

    )
    task8 = CardTask(
        card_id=7,
        description='Do thing one',
        completed=False,

    )
    task9 = CardTask(
        card_id=7,
        description='Do thing two',
        completed=False,

    )
    task10 = CardTask(
        card_id=8,
        description='Do thing one',
        completed=False
    )
    task11 = CardTask(
        card_id=8,
        description='Do thing two',
        completed=False
    )
    task12 = CardTask(
        card_id=9,
        description='Do thing one',
        completed=False
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)

    db.session.commit()

def undo_card_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.card_tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM card_tasks"))

    db.session.commit()
