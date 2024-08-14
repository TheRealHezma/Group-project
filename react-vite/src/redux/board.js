//TODO: UPDATE A BOARD AND DELETE A BOARD ###########################################################


//*VARIABLE TYPES
const GET = 'boards/LOAD';
const GET_BY_ID = 'board/LOADONE';
const CREATE = 'boards/CREATE'; // Corrected the typo
const EDIT = 'boards/EDIT';
const DELETE = 'boards/DELETE';

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
  };
};

//Post a board by board id
const createBoard = (board) => {
  return {
    type: CREATE,
    board,
  };
};

//Edit a board by board id
const editBoard = (board) => {
  return {
    type: EDIT,
    board,
  };
};

//Delete a board by board id
const deleteBoard = (board) => {
  return {
    type: DELETE,
    board,
  };
};

//*THUNKS
export const getAllBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/current');
  const allUserBoards = await response.json();
  dispatch(getBoards(allUserBoards));
};

export const getBoard = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`);
  const board = await response.json();
  dispatch(getBoardById(board));
};

// create board thunk
export const createBoardThunk = (boardData) => async (dispatch) => {
  const response = await fetch(`/api/boards/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardData),
  });
  const newBoard = await response.json();
  dispatch(createBoard(newBoard));
  return newBoard;
};

// edit board thunk
export const editBoardThunk = (boardId, boardData) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardData),
  });
  const updatedBoard = await response.json();
  dispatch(editBoard(updatedBoard));
  return updatedBoard;
};

// delete board thunk
export const deleteBoardThunk = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const deletedBoard = await response.json();
    dispatch(deleteBoard(deletedBoard));
    return deletedBoard;
  } else {
    const errorData = await response.json();
    if (response.status === 403) {
      throw new Error(errorData.message || 'You are not authorized to delete this board.');
    } else {
      throw new Error(errorData.message || 'An error occurred. Please try again.');
    }
  }
};


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
      return { ...state, currentBoard: action.board };
    }
    case CREATE: {
      return {
        ...state,
        allBoards: { ...state.allBoards, [action.board.id]: action.board },
      };
    }
    case EDIT: {
      return {
        ...state,
        allBoards: { ...state.allBoards, [action.board.id]: action.board },
      };
    }
    case DELETE: {
      const newState = { ...state.allBoards };
      delete newState[action.board.id];
      return {
        ...state,
        allBoards: { ...newState },
      };
    }
    default:
      return state;
  }
};

export default boardsReducer;
