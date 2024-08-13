import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import GrabCard from './GrabCard';
import AddButton from './AddButton';
import './ActionButtons.css';

const ActionButtons = () => {

  const handleDelete = () => {
    // Your delete logic here
    console.log('Item deleted');
  };

  const handleEdit = () => {
    // Your edit logic here
    console.log('Item edited');
  };

  const handleAdd = () => {
    // Your add logic here
    console.log('Add button clicked');
  };

  return (
    <>
    <h1>Action Buttons</h1>
    <div className="container">
      <DeleteButton onDelete={handleDelete} />
      <p>Delete Button</p>
    </div>
    <div className="container">
      <EditButton onEdit={handleEdit} />
      <p>Edit Button</p>
    </div>
    <div className="container">
      <GrabCard />
      <p>Grab indicator and cursor for drag and drop elements</p>
    </div>
    <div className="container">
      <AddButton onAdd={handleAdd} />
      <p>Add/Create Button</p>
    </div>

    </>
  );
};

export default ActionButtons;
