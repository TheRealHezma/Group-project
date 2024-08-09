import { useDispatch, useSelector } from 'react-redux';
import { deleteListById, editListById } from '../../redux/list';
import Card from '../Card/Card'
import { getAllCards } from '../../redux/card';
import { useEffect } from 'react';
import './Lists.css';

const List = ({ list }) => {
  const cards = useSelector((state) => state.cards.allCards)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards(list.id));
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

  const listCards = Object.values(cards).filter(card => card.list_id === list.id);

  return (
    <div className="list-card">
      <h3 className='list-title'>{list.name}</h3>
      <div className="cards-container">
        {listCards.map(card => (
          <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
        />
        ))}
      </div>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default List;
