from flask import Blueprint, jsonify , request
from app.models import Comment, db
from flask_login import login_required, current_user


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_comment_by_id(id):
    """
    Get a comment by id
    """
    comment = Comment.query.get(id)

    return jsonify({"Comment": comment.to_dict()}), 200


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """Edit a comment based on the comment id"""
    comment_to_edit = Comment.query.get(id)
    if not comment_to_edit:
        return jsonify({'error': 'Comment not found'}), 404

    # Check to verify board ownership
    if comment_to_edit.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    data = request.json
    comment_to_edit.content = data.get('content', comment_to_edit.content)

    db.session.commit()
    return comment_to_edit.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """Delete a comment based on comment id"""
    comment_to_delete = Comment.query.get(id)
    if not comment_to_delete:
        return jsonify({'error': 'Comment not found'}), 404
    # Check to verify board ownership
    if comment_to_delete.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(comment_to_delete)
    db.session.commit()
    return jsonify({'message': "Task successfully deleted"}), 200
