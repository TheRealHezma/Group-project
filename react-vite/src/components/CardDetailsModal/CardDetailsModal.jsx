import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
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
import styles from './CardDetailsModal.module.css';

const CardDetailsModal = ({ id }) => {
  const currentUser = useSelector((state) => state.session.user);
  const thisCard = useSelector((state) => state.cards.currentCard);
  const comments = useSelector((state) =>
    Object.values(state.comments.allCommentsByCard[thisCard.id] || {})
  );
  const tasks = useSelector((state) =>
    Object.values(state.cards.allCardTasks).filter(
      (task) => task.card_id === id
    )
  );

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskCompleted, setEditTaskCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskError, setTaskError] = useState('');
  const [editTaskError, setEditTaskError] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getCard(id));
    dispatch(getAllCardTasks(id));
    dispatch(getAllComments(id));
  }, [id, dispatch]);

  const handleCreateCardTask = (e) => {
    e.preventDefault();
    if (!taskDescription.trim()) {
      setTaskError('Please include characters in your submission');
      return;
    } else {
      const taskData = { description: taskDescription, completed: false };
      dispatch(createCardTask(thisCard.id, taskData)).then(() => {
        setTaskDescription('');
        dispatch(getAllCardTasks(id));
      });
    }
  };

  const toggleEditTask = (task) => {
    if (editingTaskId === task.id) {
      setEditingTaskId(null);
      setEditTaskDescription('');
      setEditTaskCompleted(false);
      setTaskError('');
      return;
    }
    setEditingTaskId(task.id);
    setEditTaskDescription(task.description);
    setEditTaskCompleted(task.completed);
  };

  const handleEditTask = (taskId) => {
    if (!editTaskDescription.trim()) {
      setEditTaskError('Please include characters in your submission');
      return;
    } else {
      const updatedTaskData = {
        description: editTaskDescription,
        completed: editTaskCompleted,
      };
      dispatch(editCardTaskById(taskId, updatedTaskData)).then(() => {
        setEditTaskDescription('');
        setEditingTaskId(null);
        setEditTaskError('');
        dispatch(getAllCardTasks(id));
      });
    }
  };

  const handleDeleteCardTask = (taskId) => {
    dispatch(deleteCardTaskById(taskId)).then(() => {
      dispatch(getAllCardTasks(id));
    });
  };

  const handleCreateComment = (e, cardId) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const cardIdInt = parseInt(cardId);
    if (!isNaN(cardIdInt)) {
      const payload = {
        user_id: currentUser.id,
        content: newComment,
        card_id: cardIdInt,
      };
      dispatch(createNewComment(cardIdInt, payload)).then(() => {
        setNewComment('');
        dispatch(getAllComments(cardIdInt));
      });
    }
  };

  const handleEditComment = (commentId) => {
    const updatedCommentData = { content: editCommentContent };
    dispatch(updateComment(commentId, updatedCommentData)).then(() => {
      setEditCommentContent('');
      setEditingCommentId(null);
      dispatch(getAllComments(thisCard.id));
    });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId)).then(() => {
      dispatch(getAllComments(thisCard.id));
    });
  };

  const handleEditButtonClick = (comment) => {
    if (editingCommentId === comment.id) {
      setEditingCommentId(null);
      setEditCommentContent('');
      return;
    }
    setEditingCommentId(comment.id);
    setEditCommentContent(comment.content);
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
            {taskError !== '' && <p>{taskError}</p>}
            <form onSubmit={handleCreateCardTask} className={styles.taskForm}>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Add a task"
                className={styles.taskInput}
              />
              <FaPlus className={styles.icon} onClick={handleCreateCardTask} />
            </form>
            {editTaskError !== '' && <p>{editTaskError}</p>}
            {tasks.length === 0 ? (
              <p>No tasks</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className={styles.taskItem}>
                  <p
                    className={styles.taskDescription}
                    title={task.description}
                  >
                    {task.description}
                  </p>

                  <div className={styles.taskIcons}>
                    <FaEdit
                      className={styles.icon}
                      onClick={() => toggleEditTask(task)}
                    />
                    <FaTrash
                      className={styles.icon}
                      onClick={() => handleDeleteCardTask(task.id)}
                    />
                  </div>
                  {editingTaskId === task.id && (
                    <div>
                      <input
                        type="text"
                        value={editTaskDescription}
                        onChange={(e) => setEditTaskDescription(e.target.value)}
                        className={styles.taskInput}
                      />
                      <button
                        onClick={() => handleEditTask(task.id)}
                        className={styles.button}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className={styles.cardComments}>
            <h2>Comments</h2>
            <form onSubmit={(e) => handleCreateComment(e, thisCard.id)}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <FaPlus
                className={styles.icon}
                onClick={(e) => handleCreateComment(e, thisCard.id)}
              />
            </form>
            <ul className={styles.comments}>
              {comments.length === 0 ? (
                <li>No comments</li>
              ) : (
                comments
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((comment) => (
                    <li key={comment.id} className={styles.commentItem}>
                      <span className={styles.commentText}>
                        On:{' '}
                        {new Date(comment.created_at).toLocaleDateString(
                          'en-US',
                          { weekday: 'short', month: 'short', day: '2-digit' }
                        )}{' '}
                        - {comment.username} wrote: {comment.content} -
                      </span>
                      <div className={styles.commentIcons}>
                        <FaEdit
                          className={styles.icon}
                          onClick={() => handleEditButtonClick(comment)}
                        />
                        <FaTrash
                          className={styles.icon}
                          onClick={() => handleDeleteComment(comment.id)}
                        />
                      </div>
                      {editingCommentId === comment.id && (
                        <div>
                          <input
                            type="text"
                            value={editCommentContent}
                            required
                            onChange={(e) =>
                              setEditCommentContent(e.target.value)
                            }
                          />
                          <button
                            onClick={() => handleEditComment(comment.id)}
                            className={styles.button}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
