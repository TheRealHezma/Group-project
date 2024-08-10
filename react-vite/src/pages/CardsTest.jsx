import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCards,
  getCard,
  editCardById,
  deleteCardById,
  createCardTask,
  getAllCardTasks,
  editCardTaskById,
  deleteCardTaskById,
} from '../redux/card';
import {
  getAllComments,
  createNewComment,
  updateComment,
  removeComment,
} from '../redux/comment';
import './Splash.css';
import Card from '../components/Card/Card';
import { getComment, getAllComments, createNewComment, updateComment, removeComment } from '../redux/comment';// added


const CardsTest = () => {
  const comments = useSelector((state) => state.comments.allCardComments);  //added 's' to comment

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.allCards);
<<<<<<< HEAD
  ////////////////////////////////
  const cardId = null;

  const handleCardClick = (event) => {
    cardId = event.target.id

  }

  useEffect(() => {
    dispatch(getAllComments(cardId))
  }, [dispatch])

  ////////////////////

=======
  const commentsByCard = useSelector((state) => state.comments.allCommentsByCard || {});
  const currentUser = useSelector((state) => state.session.user);
  const [newComment, setNewComment] = useState('');
  const [editCommentData, setEditCommentData] = useState({});
  const [commentsLoaded, setCommentsLoaded] = useState({});
  const [commentsOpen, setCommentsOpen] = useState({});
>>>>>>> 5fd8c16b6135b78a530b14a62385e539e7d77169

  useEffect(() => {
    dispatch(getAllCards(1));
  }, [dispatch]);

  const handleEditCard = (cardId, cardTitle, cardDescription) => {
    const updatedCardData = {
      title: cardTitle,
      description: cardDescription,
    };
    dispatch(editCardById(cardId, updatedCardData));
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCardById(cardId));
  };

  const handleCreateCardTask = (cardId, description) => {
    const taskData = {
      description: description,
      completed: false,
    };
    dispatch(createCardTask(cardId, taskData));
  };

  const handleEditSubmit = (taskId, editDesc, completed) => {
    const updatedTaskData = {
      description: editDesc,
      completed: completed,
    };
    dispatch(editCardTaskById(taskId, updatedTaskData));
  };

  const handleDeleteCardTask = (taskId) => {
    dispatch(deleteCardTaskById(taskId));
  };

  const handleLoadCardTasks = (cardId) => {
    dispatch(getAllCardTasks(cardId));
  };

  const handleGetCardById = (cardId) => {
    dispatch(getCard(cardId));
  };

  const handleLoadComments = (cardId) => {
    dispatch(getAllComments(cardId));
    setCommentsLoaded((prev) => ({ ...prev, [cardId]: true }));
    setCommentsOpen((prev) => ({ ...prev, [cardId]: true }));
  };

  const handleCreateComment = (e, cardId) => {
    e.preventDefault();
    const cardIdInt = parseInt(cardId, 10);
    if (!isNaN(cardIdInt)) {
      const payload = {
        user_id: currentUser.id,
        content: newComment,
        card_id: cardIdInt,
      };
      dispatch(createNewComment(cardIdInt, payload));
      setNewComment('');
    } else {
      console.error('Invalid card ID:', cardId);
    }
  };

  const handleEditComment = (commentId) => {
    const updatedContent = editCommentData[commentId];
    if (updatedContent) {
      dispatch(updateComment(commentId, { content: updatedContent }));
      setEditCommentData((prev) => ({ ...prev, [commentId]: '' }));
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };

  const toggleCommentsSection = (cardId) => {
    setCommentsOpen((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="splash-container">
      {Object.keys(cards).length === 0 ? (
        <h1>CREATE YOUR FIRST CARD!</h1>
      ) : (
        <div className="boards-container">
          {Object.values(cards).map((card) => (
            <div key={card.id} className="card-container">
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                onAddTask={handleCreateCardTask}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
                onLoadCardTasks={handleLoadCardTasks}
                onEditTask={handleEditSubmit}
                onDeleteTask={handleDeleteCardTask}
              />
              <button
                onClick={() => handleLoadComments(card.id)}
                disabled={commentsLoaded[card.id]}
              >
                {commentsLoaded[card.id] ? 'Comments Loaded' : 'Load Comments'}
              </button>
              <button
                onClick={() => toggleCommentsSection(card.id)}
                disabled={!commentsLoaded[card.id]}
              >
                {commentsOpen[card.id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {commentsOpen[card.id] && (
                <div className="comments-section">
                  <h3>Comments</h3>
                  <form onSubmit={(e) => handleCreateComment(e, card.id)} className="comments-form">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                    />
                    <button type="submit">Post Comment</button>
                  </form>
                  <ul className="comments-list">
                    {Object.values(commentsByCard[card.id] || {})
                      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                      .map((comment) => (
                        <li key={comment.id} className="comment-item">
                          <div className="comment-content">
                            <span className="username">{comment.username}: </span>
                            <span className="content">{comment.content}</span>
                            <span className="created-at">
                              ({new Date(comment.created_at).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: '2-digit',
                              })})
                            </span>
                          </div>
                          {currentUser.id === comment.user_id && (
                            <div className="comment-actions">
                              <input
                                type="text"
                                value={editCommentData[comment.id] || ''}
                                onChange={(e) =>
                                  setEditCommentData({
                                    ...editCommentData,
                                    [comment.id]: e.target.value,
                                  })
                                }
                                placeholder="Edit comment"
                              />
                              <button onClick={() => handleEditComment(comment.id)}>Save</button>
                              <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsTest;
