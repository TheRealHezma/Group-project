from flask import Blueprint, jsonify , request
from app.models import Comment, db
from flask_login import login_required


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """Edit a comment based on the comment id"""
    comment_to_edit = Comment.query.get(id)
    if not comment_to_edit:
        return jsonify({'error': 'Comment not found'}), 404
    
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
    
    db.session.delete(comment_to_delete)
    db.session.commit()
    return jsonify({'message': "Task successfully deleted"}), 200
