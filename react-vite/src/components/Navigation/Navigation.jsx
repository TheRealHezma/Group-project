import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useEffect, useState } from 'react';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

function Navigation({ isLoaded }) {
  const [greeting, setGreeting] = useState('');
  const [userBoards, setUserBoards] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]); //! NOT NEEDED CAUSED ERROR FOR NAVIGATING TO OTHER PAGES - BN 8/7

  const currentBoard = userBoards.find((board) => board.id === Number(id));

  return (
    <ul className="navigation">
      <li className="logo-container">
        <NavLink to="/">
          <img src="/TaskWaveNarrow.png" alt="TaskWave" className="logo" />
        </NavLink>
      </li>
      {isLoaded && user && (
        <>
          <li>
            <OpenModalButton
              buttonText={'Create Board'}
              modalComponent={<NewBoardModal />}
              className="create-board-button"
            />
          </li>
          <li className="dropdown middle">
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
