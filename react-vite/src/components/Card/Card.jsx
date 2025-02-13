import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaTrash, FaEdit, FaExpandAlt } from 'react-icons/fa';
import OpenModalButton from '../OpenModalButton';
import CardDetailsModal from '../CardDetailsModal/CardDetailsModal';
import styles from './Card.module.css';

const Card = ({
  id,
  title,
  description,
  onAddTask,
  onEditCard,
  onDeleteCard,
  reloadCards, // Add reloadCards as a prop
}) => {
  const allTasks = useSelector((state) => state.cards.allCardTasks || []);
  const [cardTasks, setCardTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [taskError, setTaskError] = useState('');

  useEffect(() => {
    const filteredTasks = Object.values(allTasks).filter(
      (task) => task.card_id === id
    );
    setCardTasks(filteredTasks);
  }, [allTasks, id]);

  const toggleAddTask = () => {
    setIsAddingTask(!isAddingTask);
    setTaskError('');
  };

  const toggleEditCard = () => {
    setIsEditingCard(!isEditingCard);
    setNewCardDescription(description);
    setNewCardTitle(title);
  };

  const handleEditCard = () => {
    onEditCard(id, newCardTitle, newCardDescription);
    setNewCardTitle('');
    setNewCardDescription('');
    setIsEditingCard(false);
    reloadCards();
  };

  const handleAddTask = () => {
    if (!taskDescription.trim()) {
      setTaskError('Please include characters in submission.');
    } else {
      onAddTask(id, taskDescription);
      setTaskDescription('');
      setIsAddingTask(false);
    }
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    onDeleteCard(id);
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.clipped} title={title}>
            {title}
          </h2>
          <p className={styles.clipped}>{description}</p>
        </div>
        <OpenModalButton
          modalComponent={<CardDetailsModal id={id} />}
          buttonText={<FaExpandAlt />}
        />
      </div>

      <div className={styles.cardButtons}>
        <button className={styles.cardButton} onClick={toggleAddTask}>
          <FaPlus />
        </button>
        {isAddingTask && (
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="New Task"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />

            {taskError !== '' && <p>{taskError}</p>}
            <button className={styles.taskButton} onClick={handleAddTask}>
              Submit Task
            </button>
          </div>
        )}
        <button className={styles.cardButton} onClick={toggleEditCard}>
          <FaEdit />
        </button>
        {isEditingCard && (
          <div className={styles.inputField}>
            <input
              type="text"
              placeholder="New Title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Description"
              value={newCardDescription}
              onChange={(e) => setNewCardDescription(e.target.value)}
            />
            <button className={styles.taskButton} onClick={handleEditCard}>
              Submit
            </button>
          </div>
        )}
        <button className={styles.cardButton} onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
      <div className={styles.cardButtonsText}>
        <p>Add Task</p>
        <p>Edit Card</p>
        <p>Delete Card</p>
      </div>

      {showConfirmDelete && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmModalContent}>
            <p>Are you sure you want to delete this card?</p>
            <p className={styles.red}>
              Doing so will delete any tasks and messages on the card.
            </p>
            <button onClick={confirmDelete} className={styles.confirmButton}>
              Delete
            </button>
            <button onClick={cancelDelete} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
