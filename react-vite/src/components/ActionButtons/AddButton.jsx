import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './Tooltip.css'; // Ensure this CSS file is imported

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
  borderRadius: '50%',
  cursor: 'pointer',
};

const iconStyle = {
  color: 'green',
  fontSize: '15px',
};

export default AddButton;
