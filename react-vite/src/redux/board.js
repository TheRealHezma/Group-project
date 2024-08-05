//*VARIABLE TYPES
const GET = 'boards/LOAD';
const GET_BY_ID = 'board/LOADONE';
const CREATE = 'boards/CREATE'; // Corrected the typo

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
  // Fetch the CSRF token from cookies
  const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf_token'));
  if (!csrfCookie) {
    console.error('CSRF token not found');
    return;
  }

  const csrfToken = csrfCookie.split('=')[1];
  const response = await fetch('/api/boards/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    },
    body: JSON.stringify(boardData),
  });

  if (response.ok) {
    const newBoard = await response.json();
    dispatch(createBoard(newBoard));
  } else {
    console.error('Failed to create board, issue in create board thunk:', response.statusText);
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
    default:
      return state;
  }
};

export default boardsReducer;
