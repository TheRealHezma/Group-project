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
import './Splash.css';
import Card from '../components/Card/Card';

const CardsTest = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.allCards);
  // const cardTasks = useSelector((state) => state.cardTasks?.allCardTasks || {});
  // const currentCard = useSelector((state) => state.cards.currentCard);
  // const [selectedCardId, setSelectedCardId] = useState(null);
  // const [newTaskDescription, setNewTaskDescription] = useState('');
  // const [cardDetails, setCardDetails] = useState(null);
  // const [editTaskDescription, setEditTaskDescription] = useState('');
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    dispatch(getAllCards(1));
  }, [dispatch]);

  const handleEditCard = (cardId) => {
    const updatedCardData = {
      title: 'Updated Title',
      description: 'Updated Description',
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

  const handleIsEditingTask = (taskId) => {
    setIsEditingTask(!isEditingTask);
  };

  const handleIsAddingTask = (taskId) => {
    setIsAddingTask(!isAddingTask);
  };

  const handleEditSubmit = (taskId) => {
    const updatedTaskData = {
      description: 'Updated Task Description',
      completed: true,
    };
    dispatch(editCardTaskById(taskId, updatedTaskData));
  };

  const handleDeleteCardTask = (taskId) => {
    dispatch(deleteCardTaskById(taskId));
  };

  const handleLoadCardTasks = (cardId) => {
    dispatch(getAllCardTasks(cardId));
    //   setSelectedCardId(cardId);
  };

  const handleGetCardById = (cardId) => {
    dispatch(getCard(cardId));
  };

  return (
    <div className="splash-container">
      {Object.keys(cards).length === 0 ? (
        <h1>CREATE YOUR FIRST CARD!</h1>
      ) : (
        <div className="boards-container">
          {Object.values(cards).map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              onAddTask={handleCreateCardTask}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
              onLoadCardTasks={handleLoadCardTasks}
              onEditTask={handleIsEditingTask}
              onDeleteTask={handleDeleteCardTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsTest;
