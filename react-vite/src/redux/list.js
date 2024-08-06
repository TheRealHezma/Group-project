//*VARIABLE TYPES
const GET = "lists/LOAD";
const EDIT = "lists/EDIT"

// //*ACTIONS

//* get all lists by board id
const getListsByBoard = (lists) => ({
  type: GET,
  lists,
});

//* edit a list
const editedList = (list) => ({
  type: EDIT,
  list,
})

//*THUNKS

//Fetch all lists by board id
export const getLists = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/lists`);
  const data = await res.json();
  dispatch(getListsByBoard(data));
};

//Edit list by id
export const editListById = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`);
  const data = await res.json()
  dispatch(editedList(data))
}
//*REDUCER
const initialState = { allLists: {}, updatedList: {}};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET: {
      const allLists = {};
      action.lists.Lists.forEach((list) => {
        allLists[list.id] = list;
      });
      console.log("HERE,",allLists)
      return {
        ...state,
        allLists: { ...allLists },
      };
    }
    case EDIT: {
      const updatedList = action.list
      return {
        ...state,
        updatedList: updatedList
      }
    }
    default:
      return state;
  }
};

export default listsReducer
