import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoards } from '../redux/board';
import { getLists } from '../redux/list'
import { Link } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.allBoards);
  const lists = useSelector((state) => state.lists.allLists);

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  useEffect(() => {
    Object.keys(boards).forEach((boardId) => {
      dispatch(getLists(boardId));
    });
  }, [dispatch, boards]);

  return (
    <div className="splash-container">
      {Object.keys(boards).length === 0 ? (
        <h1>CREATE YOUR FIRST BOARD!</h1>
      ) : (
        <div className="boards-container">
          {Object.values(boards).map((board) => (
            <Link key={board.id} to={`/boards/${board.id}`} className="board-link">
              <div className="board-card">
                <h2 className="board-name">{board.name}</h2>
                <p className="board-description">{board.description}</p>
                <div>
                  {Object.values(lists)
                    .map((list) => (
                      <div key={list.id}>
                        <h3>{list.name}</h3>
                      </div>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Splash;
