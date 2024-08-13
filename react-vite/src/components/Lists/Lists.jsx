import { useDispatch, useSelector } from "react-redux";
import { deleteListById, editListById } from "../../redux/list";
import Card from "../Card/Card";
import { getCardsByList, deleteCardById, editCardById, createCardTask, getAllCardTasks, deleteCardTaskById, editCardTaskById } from "../../redux/card";
import { useEffect } from "react";
import "./Lists.css";

const List = ({ list }) => {
  const cards = useSelector((state) => state.cards.cardsByListId[list.id]?.Cards || []);
  console.log("CARDS HERE!!!!", cards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardsByList(list.id));
  }, [dispatch, list.id]);

  const handleDelete = () => {
    dispatch(deleteListById(list.id));
  };

  const handleEdit = () => {
    const newName = prompt("Enter new list name:", list.name);
    if (newName) {
      dispatch(editListById(list.id, { name: newName }));
    }
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCardById(cardId));
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
    <div className="list-card">
      <span className="list-title">{list.name}</span>
      <div className="cards-container">
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

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default List;
