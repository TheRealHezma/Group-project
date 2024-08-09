import { FaGripLines } from 'react-icons/fa';
import './GrabCard.css'; // Ensure this CSS file is imported

const GrabCard = ({ children, onDragStart, onDragEnd }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grab-icon">
        <FaGripLines />
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default GrabCard;
