from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Card, CardTask, Comment
from datetime import datetime, timezone

card_routes = Blueprint('cards', __name__)

@card_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_card(id):
    """
    Edits and returns an existing Card
    """
    card = Card.query.get(id)

    if not card:
        return jsonify({"message": "Card couldn't be found"}), 404

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title or not description:
        errors = {}
        if not title:
            errors["title"] = "Title is required"
        if not description:
            errors["description"] = "Description is required"
        return jsonify({"message": "Bad Request", "errors": errors}), 400

    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    card.title = title
    card.description = description
    card.updated_at = datetime.now(timezone.utc)

    db.session.commit()

    return jsonify(card.to_dict()), 200

@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    """
    Deletes an existing Card
    """
    card = Card.query.get(id)

    if not card:
        return jsonify({"message": "Card couldn't be found"}), 404

    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    db.session.delete(card)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200

@card_routes.route('/<int:id>/cardtasks', methods=['GET'])
@login_required
def get_card_tasks_by_card_id(id):
    """
    Returns all card tasks that belong to a card by specified id
    """
    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403
    
    tasks = CardTask.query.filter_by(card_id=id).all()
    return jsonify({"Card Tasks": [task.to_dict() for task in tasks]}), 200

@card_routes.route('/<int:id>/cardtasks', methods=['POST'])
@login_required
def create_card_task(id):
    """
    Creates and returns a new Card_Task
    """
    data = request.get_json()
    description = data.get('description')
    completed = data.get('completed', False)

    if not description:
        return jsonify({"message": "Bad Request", "errors": {"description": "Description is required"}}), 400

    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    new_task = CardTask(
        card_id=id,
        description=description,
        completed=completed
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201

@card_routes.route('/<int:id>/comments', methods=['GET'])
@login_required
def get_comments_by_card_id(id):
    """
    Get all Comments by Card's ID
    """
    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403
    comments = Comment.query.filter_by(card_id=id).all()
    return jsonify({"Comments": [comments.to_dict() for comment in comments]}), 200

@card_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment(id):
    """
    Creates and returns a new Comment on a Card
    """
    data = request.get_json()
    content = data.get('content')
    description = data.get('description')

    if not content or not description:
        errors = {}
        if not content:
            errors["content"] = "Content is required"
        if not description:
            errors["description"] = "Description is required"
        return jsonify({"message": "Bad Request", "errors": errors}), 400

    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    new_comment = Comment(
        card_id=id,
        user_id=current_user.id,
        content=content,
        description=description
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201
