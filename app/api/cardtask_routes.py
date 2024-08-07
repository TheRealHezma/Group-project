from flask import Blueprint, jsonify , request
from app.models import CardTask, UserInBoard, db
from flask_login import login_required, current_user


cardtask_routes = Blueprint('cardtasks', __name__)

@cardtask_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_card_task(id):
    """Edit a card task based on card task id"""
    task_to_edit = CardTask.query.get(id)
    if not task_to_edit:
        return jsonify({'error': 'Card task not found'}), 404

    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403

    data = request.json
    task_to_edit.description = data.get('description', task_to_edit.description)
    task_to_edit.completed = data.get('completed', task_to_edit.completed)

    db.session.commit()
    return task_to_edit.to_dict()


@cardtask_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card_task(id):
    "Delete a card task by id"
    task_to_delete = CardTask.query.get(id)
    if not task_to_delete:
        return jsonify({'error': "Task not found"}), 404
    
    # Check for board membership of current user
    user_in_board = UserInBoard.query.filter_by(board_id=id, user_id=current_user.id).first()
    if not user_in_board:
       return jsonify({"message": "Forbidden"}), 403
    
    db.session.delete(task_to_delete)
    db.session.commit()
    return jsonify({"message": "Task successfully delete"}), 200
