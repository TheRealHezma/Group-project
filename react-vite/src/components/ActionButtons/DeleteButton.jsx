import { FaTrash } from 'react-icons/fa';
import './Tooltip.css';

const DeleteButton = ({ onDelete }) => {
  return (
    <div className="tooltip-container">
      <button onClick={onDelete} style={buttonStyle} className="tooltip-button">
        <FaTrash style={iconStyle} />
      </button>
      <span className="tooltip-text">Delete Element</span>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid red',
  borderRadius: '20%',
  cursor: 'pointer',
};

const iconStyle = {
  color: 'red',
  fontSize: '16px',
};

export default DeleteButton;
