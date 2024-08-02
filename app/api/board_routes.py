from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, UserInBoard

board_routes = Blueprint('boards', __name__)

#(for testing) remove b4 pushing
@board_routes.route('/my-boards', methods=['GET'])
@login_required
def get_user_boards():
    """
    Get all boards for the current user.
    """
    user_id = current_user.id
    boards = Board.query.filter_by(owner_id=user_id).all()
    return jsonify([board.to_dict() for board in boards])


@board_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_boards():
    """
    Get all Boards owned by the Current User (checked w/postman)
    """
    boards = Board.query.filter_by(owner_id=current_user.id).all()
    return jsonify({"Boards": [board.to_dict() for board in boards]}), 200

@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
    """
    Create a Board (checked w/postman)
    """
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({"message": "Bad Request", "errors": {"Name": "Name is required"}}), 400

    new_board = Board(
        owner_id=current_user.id,
        name=name,
        description=description
    )

    db.session.add(new_board)
    db.session.commit()

    return jsonify(new_board.to_dict()), 201

@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_board(id):
    """
    Edit a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404

    if board.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({"message": "Bad Request", "errors": {"Name": "Name is required"}}), 400

    board.name = name
    board.description = description

    db.session.commit()

    return jsonify(board.to_dict()), 200

@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    """
    Delete a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404

    if board.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(board)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200

@board_routes.route('/<int:id>/users', methods=['POST'])
@login_required
def add_user_to_board(id):
    """
    Add a User to a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404

    if board.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"message": "Bad Request", "errors": {"user_id": "User ID is required"}}), 400

    user_in_board = UserInBoard(
        board_id=id,
        user_id=user_id
    )


@board_routes.route('/<int:id>/lists')
@login_required
def get_lists_by_board(id):
    """
    Query for all lists associated with a board and returns them in a list of list dictionaries
    """
    lists = List.query.filter_by(board_id=id).all()
    return {'lists':[list.to_dict() for list in lists]}


@board_routes.route('/<int:id>/lists', methods=['POST'])
@login_required
def create_list(id):
    """
    Create a new list associated with a board and return the list as a dictionary
    """
    data = request.get_json()

    # Validate request body
    if not data or 'name' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    new_list = List(
        name=data['name'],
        board_id=id
    )
    db.session.add(new_list)
    db.session.commit()

    return jsonify(new_list.to_dict()), 201




    db.session.add(user_in_board)
    db.session.commit()

    return jsonify(user_in_board.to_dict()), 200
