import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Card.module.css';

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
  const [taskDescription, setTaskDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const filteredTasks = Object.values(allTasks).filter(
      (task) => task.card_id === id
    );
    setCardTasks(filteredTasks);
  }, [allTasks, id]);

  const toggleAddTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const toggleEditTask = (taskId) => {
    setIsEditingTask(!isEditingTask);
    setEditingTaskId(taskId);
  };

  const handleAddTask = () => {
    onAddTask(id, taskDescription);
    setTaskDescription('');
    setIsAddingTask(false);
  };

  const handleEditTask = () => {
    onEditTask(editingTaskId, editTaskDescription);
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
      <button className={styles.cardButton} onClick={toggleAddTask}>
        Add Task
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
        </div>
      )}
      <button className={styles.cardButton} onClick={() => onEditCard(id)}>
        Edit Card
      </button>
      <button className={styles.cardButton} onClick={() => onDeleteCard(id)}>
        Delete Card
      </button>
      <button className={styles.cardButton} onClick={loadTasks}>
        Load Tasks
      </button>

      {cardTasks.length > 0 && (
        <div className={styles.tasksContainer}>
          {cardTasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <p>{task.description}</p>
              <button
                className={styles.taskButton}
                onClick={() => toggleEditTask(task.id)}
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
  );
};

export default Card;
