//*VARIABLE TYPES
const GET = 'boards/LOAD';

//*ACTIONS

//? get all boards for a specific user
const getBoards = (boards) => {
  return {
    type: GET,
    boards,
  };
};

//*THUNKS
export const getAllBoards = () => async (dispatch) => {
  const response = await fetch('/api/boards/current');

  const allUserBoards = await response.json();
  console.log('hello');
  dispatch(getBoards(allUserBoards));
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
    default:
      return state;
  }
};

export default boardsReducer;
