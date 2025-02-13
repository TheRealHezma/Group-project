// src/pages/CardDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCard, editCardById, deleteCardById } from '../src/redux/card';
import { getComment, getAllComments, createNewComment, updateComment, removeComment } from '../src/redux/comment';

const CardDetails = () => {
  const { id } = useParams(); //id of card
  const dispatch = useDispatch();
  const card = useSelector((state) => state.cards.currentCard); //currentCard is empty obj, need to take away to console.log
  const comments = useSelector((state) => state.comments.allCardComments);  //added 's' to comment
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editCommentData, setEditCommentData] = useState({});

  // const cardId = null;

  // const handleCardClick = (event) => {
  //   cardId = event.target.id

  // }

  useEffect(() => {
    if (id) {

      dispatch(getCard(id)).then(() => setIsLoading(false));
      dispatch(getAllComments(id));
    }
  }, [dispatch, id])

  // Function to handle task completion toggle
  const handleTaskToggle = (taskId) => {
    const updatedTasks = card.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    dispatch(editCardById(id, { tasks: updatedTasks }));
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    dispatch(createNewComment(id, { content: newComment }));
    setNewComment('');
  };

  const handleEditComment = (commentId) => {
    const updatedContent = editCommentData[commentId];
    if (updatedContent) {
      dispatch(updateComment(commentId, updatedContent));
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };

  console.log("HERE", card.allCards)
  return (
    <div>
      <ul>
        <h1>Card Name: {card.id}</h1>
      </ul>
      <ul>
        <h2> this is the Description of Card we are going to make it super dupper long:</h2>
      </ul>
      <ul>
        <h3>Tasks:</h3>

        <button>Add Task</button>
      </ul>
      <ul>
        <h3>People the card is assigned to:</h3>
      </ul>
      <ul>
        <h2>Comments:</h2>
        <button>Add Comment</button>
      </ul>
    </div>
  )
};


export default CardDetails;
// const payload = {
//   user_id: 1,
//   content: 'TEST',
//   card_id: 1,

// }

// useEffect(() => {
//   dispatch(createNewComment(1, payload))
//   console.log("yse effect ran", payload)
// }, [dispatch])

// useEffect(() => {
//   dispatch(removeComment(6))
//   // console.log("yse effect ran", payload)
// }, [dispatch])

// useEffect(() => {
//   dispatch(updateComment(7, payload))
//   // console.log("yse effect ran", payload)
// }, [dispatch])

// useEffect(() => {
//   dispatch(getComment(7))
//   // console.log("yse effect ran", payload)
// }, [dispatch])


// console.log('Comments State is here 00000000000000000000000')
// return (
//   <h1> Hello</h1>
// )

// useEffect(() => {
//   if (id) {
//     dispatch(getCard(id)).then(() => setIsLoading(false));
//     dispatch(getAllComments(id));
//   }
// }, [dispatch, id]);

// const handleCreateComment = (e) => {
//   e.preventDefault();
//   dispatch(createNewComment(id, newComment));
//   console.log("New COMMENT", newComment)
//   setNewComment('');
// };

// const handleEditComment = (commentId) => {
//   const updatedContent = editCommentData[commentId];
//   if (updatedContent) {
//     dispatch(updateComment(commentId, updatedContent));
//   }
// };

// const handleDeleteComment = (commentId) => {
//   dispatch(removeComment(commentId));
// };

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// return (
//   <div>
//     <h2>Card Details</h2>
//     {card ? (
//       <div>
//         <h3>{card.title}</h3>
//         <p>{card.description}</p>
//         {/* Add more card details here */}
//       </div>
//     ) : (
//       <p>Card not found.</p>
//     )}

//     <h3>Comments</h3>
//     <form onSubmit={handleCreateComment}>
//       <input
//         type="text"
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//         placeholder="Add a comment"
//       />
//       <button type="submit">Post Comment</button>
//     </form>

//     <ul>
//       {Object.values(comments).map((comment) => (
//         <li key={comment.id}>
//           <p>{comment.content}</p>
//           <input
//             type="text"
//             value={editCommentData[comment.id] || ''}
//             onChange={(e) =>
//               setEditCommentData({ ...editCommentData, [comment.id]: e.target.value })
//             }
//             placeholder="Edit comment"
//           />
//           <button onClick={() => handleEditComment(comment.id)}>Edit</button>
//           <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
