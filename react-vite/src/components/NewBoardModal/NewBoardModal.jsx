import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoardThunk } from '../../redux/board';
import { useModal } from '../../context/Modal';
// import "./NewBoardModal.css";

function NewBoardModal() {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [myBoardsLocal, setMyBoardsLocal] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const { closeModal } = useModal();
  const allMyBoards = useSelector((state) =>
    Object.values(state.boards.allBoards)
  );

  useEffect(() => {
    if (allMyBoards) {
      allMyBoards.forEach((board) => {
        if (!myBoardsLocal.includes(board.name)) {
          myBoardsLocal.push(board.name);
        }
      });
    }
  }, [allMyBoards]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state to true

    if (myBoardsLocal.includes(boardName)) {
      setErrors({ name: 'A board with this name already exists.' });
      setIsSubmitting(false);
    }

    const boardData = {
      name: boardName,
      description,
    };
    dispatch(createBoardThunk(boardData))
      .then(() => closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <h1>Create New Board</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Board Name
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBoardModal;
