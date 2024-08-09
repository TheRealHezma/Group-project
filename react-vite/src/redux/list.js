//*VARIABLE TYPES
const GET = "lists/LOAD";
const EDIT = "lists/EDIT";
const DELETE = "lists/DELETE";
const CREATE = "lists/CREATE";

//*ACTIONS

// get all lists by board id
const getListsByBoard = (lists) => ({
  type: GET,
  lists,
});

// edit a list
const editedList = (list) => ({
  type: EDIT,
  list,
});

// delete a list
const deleteList = (listId) => ({
  type: DELETE,
  listId,
});

// create a list
const createList = (list) => ({
  type: CREATE,
  list,
});

//*THUNKS

// Fetch all lists by board id
export const getLists = (boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/lists`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getListsByBoard(data));
  }
};

// Edit list by id
export const editListById = (listId, updatedData) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  dispatch(editedList(data));
};

// Delete list by id
export const deleteListById = (listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteList(listId));
  }
};

// Create a list
export const createListThunk = (listData, boardId) => async (dispatch) => {
  const res = await fetch(`/api/boards/${boardId}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listData),
  });

  if (res.ok) {
    const newList = await res.json();
    dispatch(createList(newList));
    return newList;
  }
};

//*REDUCER
const initialState = { allLists: {}, updatedList: {} };

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET: {
      if (action.lists.lists) {
        const allLists = {};
        action.lists.lists.forEach((list) => {
          allLists[list.id] = list;
        });
        return {
          ...state,
          allLists: { ...allLists },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case EDIT: {
      const updatedList = action.list;
      return {
        ...state,
        allLists: {
          ...state.allLists,
          [updatedList.id]: updatedList,
        },
      };
    }
    case DELETE: {
      const newState = { ...state };
      delete newState.allLists[action.listId];
      return newState;
    }
    case CREATE: {
      return {
        ...state,
        allLists: { ...state.allLists, [action.list.id]: action.list },
      };
    }
    default:
      return state;
  }
};

export default listsReducer;
