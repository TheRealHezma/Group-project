import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import {
    getCard,
    createCardTask,
    getAllCardTasks,
    editCardTaskById,
    deleteCardTaskById,
  } from '../../redux/card';
import {
    getAllComments,
    createNewComment,
    updateComment,
    removeComment,
  } from '../../redux/comment';
  import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import styles from "./CardDetailsModal.module.css";

const CardDetailsModal = ({ id }) => {
  const currentUser = useSelector((state) => state.session.user);
  const thisCard = useSelector((state) => state.cards.currentCard);
  const comments = useSelector((state) => Object.values(state.comments.allCommentsByCard[thisCard.id] || {}));
  const tasks = useSelector((state) => 
    Object.values(state.cards.allCardTasks).filter(task => task.card_id === id)
  );
  const [newComment, setNewComment] = useState('');
  const [editCommentData, setEditCommentData] = useState({});
  const [editMode, setEditMode] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getCard(id));
    dispatch(getAllCardTasks(id));
    dispatch(getAllComments(id));
  }, [id, dispatch]);

  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskCompleted, setEditTaskCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');

  const toggleAddTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const toggleEditTask = (task) => {
    setIsEditingTask(!isEditingTask);
    setEditingTaskId(task.id);
    setEditTaskDescription(task.description);
    setEditTaskCompleted(task.completed);
  };

  const handleCreateCardTask = () => {
    const taskData = {
      description: taskDescription,
      completed: false,
    };
    dispatch(createCardTask(thisCard.id, taskData));
    setTaskDescription('');
    setIsAddingTask(false);
  };

  const handleEditTask = (taskId) => {
    const updatedTaskData = {
        description: editTaskDescription,
        completed: editTaskCompleted,
      };
      dispatch(editCardTaskById(taskId, updatedTaskData));
      setEditTaskDescription('');
      setIsEditingTask(false);
  };

  const handleDeleteCardTask = (taskId) => {
    dispatch(deleteCardTaskById(taskId));
  };

  const handleCreateComment = (e, cardId) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }
    const cardIdInt = parseInt(cardId, 10);
    if (!isNaN(cardIdInt)) {
      const payload = {
        user_id: currentUser.id,
        content: newComment,
        card_id: cardIdInt,
      };
      dispatch(createNewComment(cardIdInt, payload))
        .then(() => {
          setNewComment('');
          dispatch(getAllComments(cardIdInt));
        })
    }
  };

  const handleEditComment = (commentId, cardIdInt) => {
    const updatedContent = editCommentData[commentId];
    if (updatedContent) {
      dispatch(updateComment(commentId, { content: updatedContent }))
        .then(() => {
          setEditCommentData((prev) => ({ ...prev, [commentId]: '' }));
          setEditMode((prev) => ({ ...prev, [commentId]: false }));
          dispatch(getAllComments(cardIdInt));
        }) 
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId))
  };

  const handleEditButtonClick = (commentId) => {
    setEditMode((prev) => ({ ...prev, [commentId]: true }));
  };

  const handleBackgroundClick = (e) => {
    if (e.target.className === styles.modal) {
      closeModal();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackgroundClick}>
      <div className={styles.modalContent}>
      <h2 className={styles.cardTitle}>{thisCard.title}</h2>
      <p className={styles.cardDescription}>{thisCard.description}</p>
      <div className={styles.cardContent}>
        <div className={styles.cardTasks}>
          <h2>Tasks</h2>
          <button className={styles.icon} onClick={toggleAddTask}>
      <FaPlus />
      </button><span>Add Task</span>
      <p>______________________</p>
      {isAddingTask && (
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button className={styles.icon} onClick={handleCreateCardTask}>
            Submit Task
          </button>
        </div>
      )}
          {tasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            tasks.map((task) => (
                <div key={task.id} className={styles.task} >
              <p className={styles.clipped} title={task.description}>{task.description}</p>
              <button
                className={styles.icon}
                onClick={() => toggleEditTask(task)}
              >
                <FaEdit />
              </button>
              {isEditingTask && editingTaskId == task.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Edit Task Description"
                    value={editTaskDescription}
                    onChange={(e) => setEditTaskDescription(e.target.value)}
                  />
                  <div className={styles.checkboxContainer}>
                    <label>
                      <input
                        type="checkbox"
                        checked={editTaskCompleted}
                        onChange={(e) => setEditTaskCompleted(e.target.checked)}
                      />
                      Completed
                    </label>
                  </div>
                  <button
                    className={styles.taskButton}
                    onClick={() => handleEditTask(task.id)}
                  >
                    Save
                  </button>
                </div>
              )}
              <button
                className={styles.icon}
                onClick={() => handleDeleteCardTask(task.id)}
              >
                <FaTrash />
              </button>
            </div>
            ))
          )}
        </div>
        <div className={styles.cardComments}>
          <h2>Comments</h2>
          <form onSubmit={(e) => handleCreateComment(e, thisCard.id)} className="comments-form">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                    />
                    <button type="submit">Post Comment</button>
                    </form>
                    
          {comments.length === 0 ? (
            <p>No comments</p>
          ) : (

            
            <ul className="comments-list">
                    
                    {comments
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                      .map((comment) => (
                        <li key={comment.id} className="comment-item">
                          <div className="comment-content">
                            <span className="username">{comment.username} wrote:    </span>
                            <span className="content">{comment.content}      </span>
                            <span className="created-at">
                            <p>    on:  </p>
                              ({new Date(comment.created_at).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: '2-digit',
                              })})
                            </span>
                          </div>
                          {currentUser.id === comment.user_id && (
                            <div className="comment-actions">
                              {editMode[comment.id] ? (
                                <>
                                  <input
                                    type="text"
                                    value={editCommentData[comment.id] || ''}
                                    onChange={(e) =>
                                      setEditCommentData({
                                        // ...editCommentData,
                                        [comment.id]: e.target.value,
                                      })
                                    }
                                    placeholder="Edit comment"
                                  />
                                  <button onClick={() => handleEditComment(comment.id, thisCard.id)}>Save</button>
                                  <button onClick={() => setEditMode((prev) => ({ ...prev, [comment.id]: false }))}>Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => handleEditButtonClick(comment.id)}>Edit</button>
                                  <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
