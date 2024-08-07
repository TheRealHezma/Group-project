import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCards, getCard, editCardById, deleteCardById, createCardTask, getAllCardTasks, editCardTaskById, deleteCardTaskById } from '../redux/card';
import './Splash.css';

const CardsTest = () => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.allCards);
    const cardTasks = useSelector((state) => state.cardTasks?.allCardTasks || {});
    const currentCard = useSelector((state) => state.cards.currentCard);
    // const [selectedCardId, setSelectedCardId] = useState(null);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    // const [cardDetails, setCardDetails] = useState(null);
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);

    useEffect(() => {
      dispatch(getAllCards(1));
    }, [dispatch]);

    const handleEditCard = (cardId) => {
      const updatedCardData = {
        title: 'Updated Title',
        description: 'Updated Description'
      };
      dispatch(editCardById(cardId, updatedCardData));
    };

    const handleDeleteCard = (cardId) => {
      dispatch(deleteCardById(cardId));
    };

    const handleCreateCardTask = (cardId) => {
      const taskData = {
        description: newTaskDescription,
        completed: false
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
        completed: true
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
              <div key={card.id} className="board-card">
                <h2 className="board-name">{card.title}</h2>
                <p className="board-description">{card.description}</p>
                <button onClick={handleIsAddingTask}>Add Task</button>
                {isAddingTask && (
                    <input
                  type="text"
                  placeholder="New Task Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                )}
                <button onClick={() => handleLoadCardTasks(card.id)}>Load Tasks</button>
                <button onClick={() => handleGetCardById(3)}>Get Card By Id</button>
                <button onClick={() => handleEditCard(card.id)}>Edit Card Details</button>
                <button onClick={() => handleDeleteCard(card.id)}>Delete Card</button>
              </div>
            ))}
          </div>
        )}
        <div>
                {/* ADD Submit button */}
                <button onClick={handleIsEditingTask}>Edit Task</button>
                {isEditingTask && (
                  <div className="tasks-container">
                      <div className="task-card">
                        <input
                  type="text"
                  placeholder="Edit Task Description"
                  value={editTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <button onClick={() => handleEditSubmit(1)}>Submit Edit</button>
                </div>
                  </div>
                )}
                <div>
                    <button onClick={() => handleDeleteCardTask(1)}>Delete Task</button>
                </div>
        </div>
      </div>
    );
  };
  
  export default CardsTest;
