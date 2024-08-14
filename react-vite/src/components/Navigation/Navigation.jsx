import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useEffect, useState } from 'react';
import { deleteBoardThunk } from '../../redux/board';
import { useModal } from '../../context/Modal';
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
  const [userBoards, setUserBoards] = useState([]);
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards.allBoards);

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
    setUserBoards(Object.values(boards));
  }, [boards]);

  const handleDeleteBoard = (boardId) => {
    dispatch(deleteBoardThunk(boardId)).then(() => {
        navigate('/');                       // redirect to home page
    });

  };

  const currentBoard = userBoards.find((board) => board.id === Number(id));

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
              <li>
                <OpenModalButton 
                buttonText={'Edit Board'}
                modalComponent={<EditBoardModal boardId={id} />}
                className="edit-board-button"
                />
              </li>
              <li>
                <button onClick={() => handleDeleteBoard(id)} className='delete-board-button'>Delete Board</button>
              </li>
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
                {currentBoard ? currentBoard.name : 'My Boards'}
                <span className="arrow-down">▼</span>
              </button>
              <ul className="dropdown-menu">
                {userBoards.length > 0 ? (
                  userBoards.map((board) => (
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
      <li>{greeting}</li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
