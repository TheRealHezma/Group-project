import { useDispatch } from 'react-redux';
import { deleteListById, editListById } from '../../redux/list';
import './Lists.css';

const List = ({ list }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteListById(list.id));
  };

  const handleEdit = () => {
    const newName = prompt("Enter new list name:", list.name);
    if (newName) {
      dispatch(editListById(list.id, { name: newName }));
    }
  };

  return (
    <div className="list-card">
      <h3 className='list-title'>{list.name}</h3>
      {/* cards here */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default List;
