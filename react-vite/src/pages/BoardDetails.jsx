import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoard } from '../redux/board';
import { getLists } from '../redux/list';
import List from '../components/Lists/Lists';
import './BoardDetails.css'

const BoardDetails = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const lists = useSelector((state) => state.lists.allLists);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getLists(id));
  }, [dispatch, id]);



  return (
    <div>
      {currentBoard ? (
        <div>
          <h1>{currentBoard.name}</h1>
          <p>{currentBoard.description}</p>
          <div className="lists-container">
            {Object.values(lists).map((list) => (
              <List key={list.id} list={list} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardDetails;
