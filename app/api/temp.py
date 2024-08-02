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

    db.session.add(user_in_board)
    db.session.commit()

    return jsonify(user_in_board.to_dict()), 200
