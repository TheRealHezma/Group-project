from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, UserInBoard

# TODO: May need to add control on create list so that it checks membership

board_routes = Blueprint('boards', __name__)
# Will get all boards that user is owner or member of
@board_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_boards():
    """
    Get all Boards owned by the Current User where they are owner or member (checked w/postman)
    """
    user_boards = UserInBoard.query.filter_by(user_id=current_user.id).all()

    board_ids = [user_board.board_id for user_board in user_boards]

    boards =Board.query.filter(Board.id.in_(board_ids)).all()
    return jsonify({"Boards": [board.to_dict() for board in boards]}), 200

# Will get board by id specified if current user is owner or member
@board_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_board_by_id(id):
    """
    Get a board by id for authorized users
    """

    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    board = Board.query.get(id)
    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    return jsonify({"Board": board.to_dict()}), 200

# Will create a new board and assign current user as owner and member
@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
    """
    Create a Board and add the owner as a member
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
    db.session.flush()  # This will assign an ID to new_board without committing the transaction

    # Add the owner to the Users_in_board table
    owner_in_board = UserInBoard(
        board_id=new_board.id,
        user_id=current_user.id
    )

    db.session.add(owner_in_board)
    db.session.commit()

    return jsonify(new_board.to_dict()), 201
# Will allow owner only to edit board
@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_board(id):
    """
    Edit a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404
    # Check to verify board ownership
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
# Will allow owner only to delete board
@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    """
    Delete a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404
    # Check to verify board ownership
    if board.owner_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(board)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200
# Will allow owner only to add users to board as members
@board_routes.route('/<int:id>/users', methods=['POST'])
@login_required
def add_user_to_board(id):
    """
    Add a User to a Board (checked w/postman)
    """
    board = Board.query.get(id)

    if not board:
        return jsonify({"message": "Board couldn't be found"}), 404
    # Check to verify board ownership
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

    db.session.add(user_in_board)
    db.session.commit()

    return jsonify(user_in_board.to_dict()), 200

# Will get all lists by board id to load into board
@board_routes.route('/<int:id>/lists')
@login_required
def get_lists_by_board(id):
    """
    Query for all lists associated with a board and returns them in a list of list dictionaries
    """
    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    lists = List.query.filter_by(board_id=id).all()
    if not lists:
        return jsonify({"message": "No lists found for this board"})

    return {'Lists':[list.to_dict() for list in lists]}

# Will allow anyone to create a list on board where they are owner or member
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
    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

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
