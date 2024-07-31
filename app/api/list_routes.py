from flask import Blueprint, jsonify , request
from app.models import List, db

list_routes = Blueprint('lists', __name__)


@list_routes.route('/')
def get_lists():
    """
    Query for all lists and returns them in a list of list dictionaries
    """
    # return 'TEST'
    lists = List.query.all()
    # return jsonify(lists)
    return {'lists': [list.to_dict() for list in lists]}


# @list_routes.route('/</int:id/lists>')
# def get_lists_by_board(board_id):
#     """
#      Query for all lists associated with a board and returns them in a list of list dictionaries
#     """
#     lists = List.query.filter_by(board_id=board_id).all()
#     return {'lists':[list.to_dict() for list in lists]}


@list_routes.route('/', methods=['POST'])
def create_list():
    """
    Create a new list and return the list in dictionry
    """
    data = request.json
    new_list = List(
        name = data['name'],
        board_id = data['board_id']
    )
    db.session.add(new_list)
    db.session.commit()
    return new_list.to_dict(), 201


@list_routes.route('/<int:id>', methods=['PUT'])
def edit_list(id):
    """
    Edit a list by id and return the updated list in a dictionary
    """
    list_to_edit = List.query.get(id)
    if not list_to_edit:
        return jsonify({"error": "List not found"}), 404

    data = request.json
    list_to_edit.name = data.get('name', list_to_edit.name)
    list_to_edit.board_id = data.get('board_id', list_to_edit.board_id)

    db.session.commit()
    return list_to_edit.to_dict()


@list_routes.route('/<int:id>', methods=['DELETE'])
def delete_list(id):
    """
    Delete a list by id and return a success message
    """
    list_to_delete = List.query.get(id)
    if not list_to_delete:
        return jsonify({"error": "List not found"}), 404

    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify({"message": "List deleted successfully"}), 200
