// src/pages/Splash.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBoards } from '../redux/board';
import { useModal } from '../context/Modal';
import SignupFormModal from '../components/SignupFormModal';
import './Splash.css';

const Splash = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.allBoards);
  const currentUser = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  return (
    <div
      className={`splash-container ${
        !currentUser ? 'gradient-background' : ''
      }`}
    >
      {!currentUser && (
        <div className="welcome-container">
          <h1 className="welcome-title">
            The All-in-one Solution for Managing Your Team, Tasks and Workflow
            in one Place!
          </h1>
          <div className="content-container">
            <div className="left-content">
              <h3>
                Don&apos;t be an <span className="green">Ogre!</span>
              </h3>
              <div className="image-wrapper">
                <img
                  src="/Ogre.jpg"
                  alt="Office Ogre"
                  className="welcome-image"
                />
              </div>
            </div>
            <div className="right-content">
              <h3>....Get Task Wave Today!</h3>
              <div className="image-wrapper">
                <img
                  src="/OfficePeople.jpg"
                  alt="Office People"
                  className="welcome-image"
                />
              </div>
            </div>
          </div>
          <div className="signup-container">
            <h3>Signup and create your first board for free today!</h3>
            <button onClick={openSignupModal}>Sign Up</button>
          </div>
        </div>
      )}
      {currentUser && (
        <>
          {Object.keys(boards).length === 0 ? (
            <h2>CREATE YOUR FIRST BOARD!</h2>
          ) : (
            <div className="boards-container">
              {Object.values(boards).map((board) => (
                <Link
                  key={board.id}
                  to={`/boards/${board.id}`}
                  className="board-link"
                >
                  <div key={board.id} className="board-card">
                    <h2 className="board-name">{board.name}</h2>
                    <p className="board-description">{board.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Splash;
