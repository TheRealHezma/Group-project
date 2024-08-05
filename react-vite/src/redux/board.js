//*VARIABLE TYPES
const GET = 'boards/LOAD';
const GET_BY_ID = 'board/LOADONE';

//*ACTIONS

//? get all boards for a specific user where they are owner or member
const getBoards = (boards) => {
    return {
        type: GET,
        boards,
  };
};
// get a board by board id
const getBoardById = (board) => {
    return {
        type: GET_BY_ID,
        board,
    }
}
 
//*THUNKS
export const getAllBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/current');

  const allUserBoards = await response.json();
  dispatch(getBoards(allUserBoards));
};

export const getBoard = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`) ;

  const board = await response.json();
  dispatch(getBoardById(board));
}

//*INITIAL STATE + REDUCER
const initialState = { allBoards: {}, currentBoard: {} };

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET: {
      const allBoards = {};
      action.boards.Boards.forEach((board) => {
        allBoards[board.id] = board;
      });
      return {
        ...state,
        allBoards: { ...allBoards },
      };
    }
    case GET_BY_ID: {
        const currentBoard = action.board;
        return { ...state, currentBoard: currentBoard }
    }
    default:
      return state;
  }
};

export default boardsReducer;
