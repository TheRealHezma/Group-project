import { FaEdit } from 'react-icons/fa';
import './Tooltip.css';

const EditButton = ({ onEdit }) => {
  return (
    <div className="tooltip-container">
      <button onClick={onEdit} className="tooltip-button" style={buttonStyle}>
        <FaEdit style={iconStyle} />
      </button>
      <span className="tooltip-text">Edit Element</span>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'transparent',
//   border: '1px solid yellow',
  borderRadius: '20%',
  cursor: 'pointer',
//   padding: '5px',
};

const iconStyle = {
//   marginBottom: '-2px',
  color: 'yellow',
  fontSize: '19px',
};

export default EditButton;
