// // CommentList.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllComments, createNewComment, updateComment, removeComment } from './comment'; // Adjust path as necessary

// const CommentList = ({ cardId }) => {
//     const dispatch = useDispatch();
//     const comments = useSelector((state) => state.comments.allComments);

//     useEffect(() => {
//         dispatch(getAllComments(cardId));
//     }, [dispatch, cardId]);
//     console.log("HELOOOOOOOOOOOOOOOOOOOOOO")
//     const [newCommentContent, setNewCommentContent] = useState('');
//     const [editCommentContent, setEditCommentContent] = useState('');
//     const [editCommentId, setEditCommentId] = useState(null);

//     const handleCreate = () => {
//         if (newCommentContent) {
//             dispatch(createNewComment(cardId, newCommentContent));
//             setNewCommentContent('');
//         }
//     };

//     const handleEdit = (commentId) => {
//         if (editCommentContent) {
//             dispatch(updateComment(commentId, editCommentContent));
//             setEditCommentContent('');
//             setEditCommentId(null);
//         }
//     };

//     const handleDelete = (commentId) => {
//         if (window.confirm('Are you sure you want to delete this comment?')) {
//             dispatch(removeComment(commentId));
//         }
//     };

//     const startEditing = (comment) => {
//         setEditCommentId(comment.id);
//         setEditCommentContent(comment.content);
//     };

//     return (
//         <div>
//             <h2>Comments</h2>
//             <ul>
//                 {Object.values(comments).map((comment) => (
//                     <li key={comment.id}>
//                         {editCommentId === comment.id ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     value={editCommentContent}
//                                     onChange={(e) => setEditCommentContent(e.target.value)}
//                                 />
//                                 <button onClick={() => handleEdit(comment.id)}>Save</button>
//                                 <button onClick={() => setEditCommentId(null)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div>
//                                 {comment.content}
//                                 <button onClick={() => startEditing(comment)}>Edit</button>
//                                 <button onClick={() => handleDelete(comment.id)}>Delete</button>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="New comment"
//                     value={newCommentContent}
//                     onChange={(e) => setNewCommentContent(e.target.value)}
//                 />
//                 <button onClick={handleCreate}>Add Comment</button>
//             </div>
//         </div>
//     );
// };

export default CommentList;
