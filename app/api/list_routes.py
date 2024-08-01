from flask import Blueprint, jsonify, request
from app.models import List, Card, db
from flask_login import login_required

list_routes = Blueprint('lists', __name__)


# Create a List
# @list_routes.route('/<int:board_id>/lists', methods=['POST'])
# @login_required
# def create_list(board_id):
#     """
#     Create a new list and return the list in a dictionary
#     """
#     data = request.json
#     if 'name' not in data or not data['name']:
#         return jsonify({"message": "Bad Request", "errors": {"Name": "Name is required"}}), 400

#     new_list = List(
#         name=data['name'],
#         board_id=board_id
#     )
#     db.session.add(new_list)
#     db.session.commit()
#     return new_list.to_dict(), 201

# Edit a List
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_list(id):
    """
    Edit a list by id and return the updated list in a dictionary
    """
    list_to_edit = List.query.get(id)
    if not list_to_edit:
        return jsonify({"message": "List couldn't be found"}), 404

    data = request.json
    if 'name' not in data or not data['name']:
        return jsonify({"message": "Bad Request", "errors": {"Name": "Name is required"}}), 400

    list_to_edit.name = data.get('name', list_to_edit.name)
    list_to_edit.board_id = data.get('board_id', list_to_edit.board_id)
    db.session.commit()
    return list_to_edit.to_dict(), 201

# Delete a List
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    """
    Delete a list by id and return a success message
    """
    print(id)
    list_to_delete = List.query.get(id)
    print("HERE",list_to_delete)
    if not list_to_delete:
        return jsonify({"message": "List couldn't be found"}), 404

    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200

# Create a Card
@list_routes.route('/<int:list_id>/cards', methods=['POST'])
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


@list_routes.route('/<int:list_id>/cards', methods=['GET'])
# @login_required
def get_cards_by_list_id(list_id):
    """
    Get all Cards by List's ID
    """
    list_exist = List.query.get(list_id)
    if not list_exist:
        return jsonify({"message": "Cards do not exist because the list does not exist"}), 404

    cards = Card.query.filter_by(list_id=list_id).all()
    return jsonify({"Cards": [card.to_dict() for card in cards]}), 200
