import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBoards } from '../redux/board';
import { useModal } from '../context/Modal';
import SignupFormModal from '../components/SignupFormModal';
import styles from './Splash.module.css';
// import styles from '../components/Footer/Footer.css'

const Splash = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.allBoards);
  const currentUser = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllBoards()).catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access - user may need to log in.');
        }
      });
    }
  }, [dispatch, currentUser]);

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  return (
    <div className={`${styles.splashContainer} ${!currentUser ? styles.gradientBackground : ''}`}>
      {!currentUser ? (
        <div className={styles.welcomeContainer}>
          <h1 className={styles.welcomeTitle}>The All-in-one Solution for Managing Your Team, Tasks and Workflow in one Place!</h1>
          <div className={styles.contentContainer}>
            <div className={styles.leftContent}>
              <h3>Don&apos;t be an <span className={styles.green}>Ogre!</span></h3>
              <div className={styles.imageWrapper}>
                <img src="/Ogre.jpg" alt="Office Ogre" className={styles.welcomeImage} />
              </div>
            </div>
            <div className={styles.rightContent}>
              <h3>....Get Task Wave Today!</h3>
              <div className={styles.imageWrapper}>
                <img src="/OfficePeople.jpg" alt="Office People" className={styles.welcomeImage} />
              </div>
            </div>
          </div>
          <div className={styles.signupContainer}>
            <h3>Signup and create your first board for free today!</h3>
            <button onClick={openSignupModal}>Sign Up</button>
          </div>
        </div>
      ) : (
        <>
          {Object.keys(boards).length === 0 ? (
            <h2>CREATE YOUR FIRST BOARD!</h2>
          ) : (
            <div className={styles.boardsContainer}>
              {Object.values(boards).map((board) => (
                <Link key={board.id} to={`/boards/${board.id}`} className={styles.boardLink}>
                  <div className={styles.boardCard}>
                    <h2 className={styles.boardName}>{board.name}</h2>
                    <p className={styles.boardDescription}>{board.description}</p>
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
