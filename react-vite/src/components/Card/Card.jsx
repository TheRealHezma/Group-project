import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import styles from './Card.module.css';
import AddButton from '../ActionButtons/AddButton';
import EditButton from '../ActionButtons/EditButton';
import DeleteButton from '../ActionButtons/DeleteButton';

const Card = ({
  id,
  title,
  description,
  onAddTask,
  onEditCard,
  onDeleteCard,
  onLoadCardTasks,
  onEditTask,
  onDeleteTask,
}) => {
  const allTasks = useSelector((state) => state.cards.allCardTasks || []);
  const [cardTasks, setCardTasks] = useState([]);
  //*State for editing task
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskCompleted, setEditTaskCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  //*State for adding a new task to a card
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  //*State for editing a card
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [isEditingCard, setIsEditingCard] = useState(false);
  
  useEffect(() => {
    const filteredTasks = Object.values(allTasks).filter(
      (task) => task.card_id === id
    );
    setCardTasks(filteredTasks);
  }, [allTasks, id]);

  const toggleAddTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const toggleEditCard = () => {
    setIsEditingCard(!isEditingCard);
  };

  const handleEditCard = () => {
    onEditCard(id, newCardTitle, newCardDescription);
    setNewCardTitle('');
    setNewCardDescription('');
  };

  const toggleEditTask = (task) => {
    setIsEditingTask(!isEditingTask);
    setEditingTaskId(task.id);
    setEditTaskDescription(task.description);
    setEditTaskCompleted(task.completed);
  };

  const handleAddTask = () => {
    onAddTask(id, taskDescription);
    setTaskDescription('');
    setIsAddingTask(false);
  };

  const handleEditTask = () => {
    onEditTask(editingTaskId, editTaskDescription, editTaskCompleted);
    setEditTaskDescription('');
    setIsEditingTask(false);
    setEditingTaskId(null);
  };

  const loadTasks = () => {
    onLoadCardTasks(id);
  };

  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      {/* <div className={styles.cardButtons}>
        <span>Edit Card</span><EditButton onClick={toggleEditCard} />
        <span>Delete Card</span><DeleteButton onClick={() => onDeleteCard(id)} />
        <span>Add Task</span><AddButton onClick={toggleAddTask} />
        </div> */}
        <div className={styles.cardButtons}>
      <button className={styles.cardButton} onClick={toggleAddTask}>
      <FaPlus />
      </button>
      {isAddingTask && (
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button className={styles.taskButton} onClick={handleAddTask}>
            Submit Task
          </button>
          <p>Submit Task</p>
        </div>
      )}
      <button className={styles.cardButton} onClick={toggleEditCard}>
      <FaEdit />
      </button>
      {isEditingCard && (
        <div>
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

      <button className={styles.cardButton} onClick={() => onDeleteCard(id)}>
      <FaTrash  />
      </button>
      {/* <button className={styles.cardButton} onClick={loadTasks}>
        Load Tasks
      </button> */}

      {cardTasks.length > 0 && (
        <div className={styles.tasksContainer}>
          {cardTasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <p>{task.description}</p>
              <button
                className={styles.taskButton}
                onClick={() => toggleEditTask(task)}
              >
                Edit Task
              </button>
              {isEditingTask && editingTaskId === task.id && (
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
                    onClick={handleEditTask}
                  >
                    Submit Edit
                  </button>
                </div>
              )}
              <button
                className={styles.taskButton}
                onClick={() => onDeleteTask(task.id)}
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
      <div className={styles.cardButtonsText}>
        <p>Add Task</p>
        <p>Edit Card</p>
        <p>Delete Card</p>
        </div>
    </div>
  );
};

export default Card;
