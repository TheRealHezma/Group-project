import { useDispatch, useSelector } from 'react-redux';
import { deleteListById, editListById } from '../../redux/list';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Card from '../Card/Card';
import {
  getCardsByList,
  deleteCardById,
  editCardById,
  createCardTask,
  getAllCardTasks,
  deleteCardTaskById,
  editCardTaskById,
} from '../../redux/card';
import { useEffect, useState } from 'react';
import styles from './Lists.module.css';

const List = ({ list }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const cards = useSelector(
    (state) => state.cards.cardsByListId[list.id]?.Cards || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardsByList(list.id));
  }, [dispatch, list.id]);

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteListById(list.id));
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleEdit = () => {
    const newName = prompt('Enter new list name:', list.name);
    if (newName) {
      dispatch(editListById(list.id, { name: newName }));
    }
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCardById(cardId, list.id));
  };

  const handleEditCard = (cardId, newCardTitle, newCardDescription) => {
    dispatch(
      editCardById(cardId, {
        title: newCardTitle,
        description: newCardDescription,
      })
    );
  };

  const handleLoadCardTasks = (cardId) => {
    dispatch(getAllCardTasks(cardId));
  };

  const handleAddTask = (cardId, description) => {
    const taskData = {
      description: description,
      completed: false,
    };
    dispatch(createCardTask(cardId, taskData));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteCardTaskById(taskId));
  };

  const handleEditTask = (taskId, editDesc, completed) => {
    const updatedTaskData = {
      description: editDesc,
      completed: completed,
    };
    dispatch(editCardTaskById(taskId, updatedTaskData));
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.listCard}>
        <span className={styles.listTitle}>{list.name}</span>
        <div className={styles.cardsContainer}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              onAddTask={handleAddTask}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
              onLoadCardTasks={handleLoadCardTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.actionItem}>
            <button onClick={handleEdit} className={styles.edit}><FaEdit /></button>
            <span className={styles.text}>Edit List</span>
          </div>
          <div className={styles.actionItem}>
            <button onClick={handleDelete} className={styles.delete}><FaTrash /></button>
            <span className={styles.text}>Delete List</span>
          </div>
        </div>
      </div>
      {showConfirmDelete && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
            <p>Are you sure you want to delete this list?</p>
            <button onClick={confirmDelete} className={styles.confirmButton}>Delete</button>
            <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
