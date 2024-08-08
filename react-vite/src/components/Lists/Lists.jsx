import { useDispatch } from 'react-redux';
import { deleteListById } from '../../redux/list';
import { useModal } from '../../context/Modal';
import EditListForm from '../EditListForm/EditListForm';
import './Lists.css';

const List = ({ list }) => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const handleDelete = () => {
    dispatch(deleteListById(list.id));
  };

  const handleEdit = () => {
    setModalContent(<EditListForm listId={list.id} currentName={list.name} />);
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
