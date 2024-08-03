//*VARIABLE TYPES
const GET = "lists/LOAD";

//*ACTIONS

//* get all lists by board id
const getListsByBoard = (lists) => ({
  type: GET,
  lists,
});

//*THUNKS

//Fetch all lists by board id
export const getLists = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/lists`);
  console.log('BoardId:',boardId)
  const data = await res.json();
  console.log('DATA:', data)
  dispatch(getListsByBoard(data));
};

//*REDUCER
const initialState = { allLists: {}};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET: {
      const allLists = {};
      action.lists.Lists.forEach((list) => {
        allLists[list.id] = list;
      });

      return {
        ...state,
        allLists: { ...allLists },
      };
    }
    default:
      return state;
  }
};

export default listsReducer
