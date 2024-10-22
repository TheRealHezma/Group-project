import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBoard } from '../redux/board';
import { getLists } from '../redux/list';
import List from '../components/Lists/Lists';
import { useModal } from '../context/Modal';
import NewListForm from '../components/NewListForm/NewListForm';
import styles from './BoardDetails.module.css';

const BoardDetails = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const lists = useSelector((state) => state.lists.allLists);
  const { id } = useParams();
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(getBoard(id));
    dispatch(getLists(id));
  }, [dispatch, id]);

  const openNewListModal = () => {
    setModalContent(<NewListForm boardId={id} />);
  };

  const refreshLists = () => {
    dispatch(getLists(id)); // Refresh the lists after a list is deleted
  };

  return (
    <div className={styles.wrapper}>
      {currentBoard ? (
        <div>
          <h1>{currentBoard.name}</h1>
          <p>{currentBoard.description}</p>
          <button onClick={openNewListModal}>Create New List</button>
          <div className={styles.listsContainer}>
            {Object.keys(lists).length > 0 ? (
              Object.values(lists).map((list) => (
                <List
                  key={list.id}
                  list={list}
                  onListDeleted={refreshLists} // Pass refreshLists to List component
                />
              ))
            ) : (
              <p>No lists! Make one today!</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardDetails;
