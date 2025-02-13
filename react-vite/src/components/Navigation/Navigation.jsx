import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useEffect, useState } from 'react';
import { deleteBoardThunk, getAllBoards } from '../../redux/board';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditBoardModal from './EditBoardModal';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards.allBoards);
  const [currentBoardName, setCurrentBoardName] = useState('My Boards');
  const [isBoardOwner, setIsBoardOwner] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getAllBoards(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingMessage = '';

    if (currentHour < 12) {
      greetingMessage = "Good morning! Let's get to work.";
    } else if (currentHour < 18) {
      greetingMessage = "Good afternoon! Let's get to work.";
    } else {
      greetingMessage = "Good evening! Let's get to work.";
    }

    setGreeting(greetingMessage);
  }, []);

  useEffect(() => {
    const userBoards = Object.values(boards);
    const currentBoard = userBoards.find((board) => board.id === Number(id));

    if (currentBoard) {
      setCurrentBoardName(currentBoard.name);
      setIsBoardOwner(currentBoard.owner_id === user.id); // Check if the current user is the board owner
    } else {
      setCurrentBoardName('My Boards');
      setIsBoardOwner(false);
    }
  }, [boards, id, user]);

  const handleDeleteBoard = () => {
    setShowConfirmDelete(true);
    setErrorMessage('');
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteBoardThunk(id));
      navigate('/'); // redirect to home page
      setShowConfirmDelete(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <ul className="navigation">
      <li className="logo-container">
        <NavLink to="/">
          <img src="/TaskWaveNarrow2.png" alt="TaskWave" className="logo" />
        </NavLink>
      </li>
      {isLoaded && user && (
        <>
          {location.pathname === `/boards/${id}` ? (
            <>
              {isBoardOwner && ( // Only show edit and delete options if the user is the board owner
                <>
                  <li>
                    <OpenModalButton
                      buttonText={'Edit Board'}
                      modalComponent={
                        <EditBoardModal
                          boardId={id}
                          currentBoardName={currentBoardName}
                        />
                      }
                      className="edit-board-button"
                    />
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteBoard}
                      className="delete-board-button"
                    >
                      Delete Board
                    </button>
                  </li>
                </>
              )}
            </>
          ) : (
            <li>
              <OpenModalButton
                buttonText={'Create Board'}
                modalComponent={<NewBoardModal />}
                className="create-board-button"
              />
            </li>
          )}
          <li className="dropdown middle">
            <div className="dropdown-wrapper">
              <button className="dropdown-toggle">
                {currentBoardName}
                <span className="arrow-down">▼</span>
              </button>
              <ul className="dropdown-menu">
                {Object.values(boards).length > 0 ? (
                  Object.values(boards).map((board) => (
                    <li key={board.id}>
                      <NavLink to={`/boards/${board.id}`}>{board.name}</NavLink>
                    </li>
                  ))
                ) : (
                  <li>No boards available</li>
                )}
              </ul>
            </div>
          </li>
        </>
      )}
      <li className="greeting">{greeting}</li>
      <li>
        <ProfileButton />
      </li>

      {showConfirmDelete && (
        <div className="confirmModal">
          <div className="confirmModalContent">
            {errorMessage ? (
              <>
                <p>{errorMessage}</p>
                <button onClick={cancelDelete} className="closeButton">
                  Close
                </button>
              </>
            ) : (
              <>
                <p>Are you sure you want to delete this board?</p>
                <p className="red">
                  Doing so will delete any lists, cards, tasks and messages on
                  the board.
                </p>
                <button onClick={confirmDelete} className="confirmButton">
                  Delete
                </button>
                <button onClick={cancelDelete} className="cancelButton">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </ul>
  );
}

export default Navigation;
