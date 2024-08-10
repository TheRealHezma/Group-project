import { FaPlus } from 'react-icons/fa';
import './Tooltip.css';

const AddButton = ({ onAdd }) => {
  return (
    <div className="tooltip-container">
      <button onClick={onAdd} className="tooltip-button" style={buttonStyle}>
        <FaPlus style={iconStyle} />
      </button>
      <span className="tooltip-text">Create new element</span>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid green',
  borderRadius: '45%',
  cursor: 'pointer',
  padding: '4px 5px',
};

const iconStyle = {
  color: 'green',
  marginBottom: '-2px',
  fontSize: '16px',
};

export default AddButton;
