from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Card

card_routes = Blueprint('cards', __name__)

@card_routes.route('/lists/<int:list_id>/cards', methods=['POST'])
@login_required
def create_card(list_id):
    """
    Creates and returns a new Card
    """
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

    new_card = Card(
        title=title,
        list_id=list_id,
        description=description
    )

    db.session.add(new_card)
    db.session.commit()

    return jsonify(new_card.to_dict()), 201

@card_routes.route('/cards/<int:id>', methods=['PUT'])
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

    card.title = title
    card.description = description
    card.updated_at = datetime.now(timezone.utc)

    db.session.commit()

    return jsonify(card.to_dict()), 200

@card_routes.route('/cards/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    """
    Deletes an existing Card
    """
    card = Card.query.get(id)

    if not card:
        return jsonify({"message": "Card couldn't be found"}), 404

    db.session.delete(card)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200
