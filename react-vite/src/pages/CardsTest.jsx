import { useEffect } from 'react';
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
import { getComment, getAllComments, createNewComment, updateComment, removeComment } from '../redux/comment';// added


const CardsTest = () => {
  const comments = useSelector((state) => state.comments.allCardComments);  //added 's' to comment

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.allCards);
  ////////////////////////////////
  const cardId = null;

  const handleCardClick = (event) => {
    cardId = event.target.id

  }

  useEffect(() => {
    dispatch(getAllComments(cardId))
  }, [dispatch])

  ////////////////////


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
              onEditTask={handleEditSubmit}
              onDeleteTask={handleDeleteCardTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsTest;
