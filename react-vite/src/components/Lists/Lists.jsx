import { useDispatch, useSelector } from 'react-redux';
import { deleteListById, editListById } from '../../redux/list';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
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
import NewCardModal from './NewCardModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const List = ({ list, onListDeleted }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [newListName, setNewListName] = useState(list.name);

  const cards = useSelector(
    (state) => state.cards.cardsByListId[list.id]?.Cards || []
  );

  const dispatch = useDispatch();

  const reloadCards = () => {
    dispatch(getCardsByList(list.id));
  };

  useEffect(() => {
    reloadCards();
  }, [dispatch, list.id]);

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteListById(list.id));
    setShowConfirmDelete(false);
    if (onListDeleted) {
      onListDeleted(); // Call the callback to refresh the lists
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleEdit = () => {
    setShowEditConfirm(true);
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
    reloadCards();
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
              reloadCards={reloadCards}
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
          <div className={styles.actionItem}>
            <OpenModalButton
              buttonText={<FaPlus />}
              modalComponent={<NewCardModal listId={list.id} onCardCreated={reloadCards} />}
              className={styles.addCard}
            />
            <span className={styles.text}>Add Card</span>
          </div>
        </div>
      </div>
      {showConfirmDelete && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
            <p>Are you sure you want to delete this list?</p>
            <p className={styles.red}>Doing so will delete any cards, tasks and messages on the list.</p>
            <button onClick={confirmDelete} className={styles.confirmButton}>Delete</button>
            <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
      {showEditConfirm && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
          <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="editListName">Enter new list name:</label>
              <input
                id="editListName"
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    if (newListName.trim()) {
                      dispatch(editListById(list.id, { name: newListName.trim() }));
                      setShowEditConfirm(false);
                    }
                  }}
                  className={styles.confirmButton}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowEditConfirm(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
