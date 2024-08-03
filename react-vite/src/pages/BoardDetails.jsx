import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoard } from '../redux/board';
import { getLists } from '../redux/list'

// Probably going to get the children's details lists/cards etc. in fetches here


const BoardDetails = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getLists(id))
  },[dispatch, id])

  return (
    <div>
      {currentBoard ? (
        <div>
          <h1>{currentBoard.Board.name}</h1>
          <p>{currentBoard.Board.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardDetails;
