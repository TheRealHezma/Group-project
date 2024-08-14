//ERIC HAS AN IMPROVED THUNK FOR GET ALL CARDS FOR LIST BY LIST ID THAT CAN BE ADDED -IT'S ON MY FORK RIGHT NOW

//*VARIABLE TYPES
const GET = "cards/LOAD";
const GET_BY_ID = "cards/LOADONE";
const EDIT_CARD = "cards/EDIT";
const DELETE_CARD = "cards/DELETE";
const GET_TASKS = "cardTasks/LOAD";
const CREATE_TASK = "cardTasks/CREATE";
const GET_TASK_BY_ID = "cardTasks/LOADONE";
const EDIT_TASK = "cardTasks/EDIT";
const DELETE_TASK = "cardTasks/DELETE";
const GET_CARDS_BY_LIST = "cards/LOAD_BY_LIST";

//*ACTIONS

// get all cards for a specific list id
const getCards = (cards) => {
  return {
    type: GET,
    cards,
  };
};

// get all cards for a specific list id
const getCardsByListAction = (listId, cards) => ({
  type: GET_CARDS_BY_LIST,
  listId,
  cards,
});

// get a card by card_id
const getCardById = (card) => {
  return {
    type: GET_BY_ID,
    card,
  };
};

// edit a card by id
const editCard = (card) => {
  return {
    type: EDIT_CARD,
    card,
  };
};

// delete a card by id
const deleteCard = (cardId, listId) => {
  return {
    type: DELETE_CARD,
    cardId,
    listId,
  };
};

// create a card task
const newCardTask = (cardTask) => {
  return {
    type: CREATE_TASK,
    cardTask,
  };
};

// get all cardTasks for a specific card id
const getCardTasks = (cardTasks) => {
  return {
    type: GET_TASKS,
    cardTasks,
  };
};

// get a cardTask by cardTask id
const getCardTaskById = (cardTask) => {
  return {
    type: GET_TASK_BY_ID,
    cardTask,
  };
};

// edit a card task by id
const editCardTask = (task) => {
  return {
    type: EDIT_TASK,
    task,
  };
};

// delete a card task by id
const deleteCardTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

//*THUNKS

export const getAllCards = (listId) => async (dispatch) => {
  const response = await fetch(`/api/lists/${listId}/cards`);
  const allListCards = await response.json();
  dispatch(getCards(allListCards));
};

export const getCardsByList = (listId) => async (dispatch) => {
  const response = await fetch(`/api/lists/${listId}/cards`);
  const cards = await response.json();
  dispatch(getCardsByListAction(listId, cards));
};

export const getCard = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}/`);
  const card = await response.json();
  dispatch(getCardById(card));
};

export const editCardById = (cardId, cardData) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  if (response.ok) {
    const updatedCard = await response.json();
    dispatch(editCard(updatedCard));
  }
};

export const deleteCardById = (cardId, listId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCard(cardId, listId));
  }
};

export const getAllCardTasks = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}/cardtasks`);
  const allCardTasks = await response.json();
  dispatch(getCardTasks(allCardTasks));
};

export const createCardTask = (cardId, taskData) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}/cardtasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (response.ok) {
    const newTask = await response.json();
    dispatch(newCardTask(newTask));
  }
};

export const getCardTask = (cardTaskId) => async (dispatch) => {
  const response = await fetch(`/api/cardTasks/${cardTaskId}`);
  const cardTask = await response.json();
  dispatch(getCardTaskById(cardTask));
};

export const editCardTaskById = (taskId, taskData) => async (dispatch) => {
  const response = await fetch(`/api/cardtasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (response.ok) {
    const updatedTask = await response.json();
    dispatch(editCardTask(updatedTask));
  }
};

export const deleteCardTaskById = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/cardtasks/${taskId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCardTask(taskId));
  }
};

//*INITIAL STATE + REDUCER
const initialState = {
  allCards: {},
  currentCard: {},
  allCardTasks: {},
  currentCardTask: {},
  cardsByListId: {},
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET: {
      const allCards = {};
      action.cards.Cards.forEach((card) => {
        allCards[card.id] = card;
      });
      return {
        ...state,
        allCards: { ...allCards },
      };
    }
    case GET_CARDS_BY_LIST: {
      const { listId, cards } = action;
      return {
        ...state,
        cardsByListId: {
          ...state.cardsByListId,
          [listId]: cards,
        },
      };
    }
    case GET_BY_ID: {
      const currentCard = action.card;
      return { ...state, currentCard: currentCard };
    }
    case EDIT_CARD: {
      const updatedCard = action.card;
      const listId = updatedCard.list_id;
      const cardToBeUpdated = state.cardsByListId[listId].Cards;
      return {
        ...state,
        allCards: {
          ...state.allCards,
          [updatedCard.id]: updatedCard,
        },
        cardsByListId: {
          ...state.cardsByListId,
          [listId]: {
            ...state.cardsByListId[listId],
            Cards: cardToBeUpdated.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            ),
          },
        },
      };
    }
    case DELETE_CARD: {
      const newCards = { ...state.allCards };
      const listId = action.listId;
      const cardsNotToBeDeleted = state.cardsByListId[
        action.listId
      ].Cards.filter((card) => card.id != action.cardId);
      delete newCards[action.cardId];
      return {
        ...state,
        allCards: newCards,
        currentCard:
          state.currentCard.id === action.cardId ? {} : state.currentCard,
        cardsByListId: {
          ...state.cardsByListId,
          [listId]: {
            ...state.cardsByListId[listId],
            Cards: cardsNotToBeDeleted,
          },
        },
      };
    }
    case GET_TASKS: {
      const allCardTasks = {};
      action.cardTasks.CardTasks.forEach((cardTask) => {
        allCardTasks[cardTask.id] = cardTask;
      });
      return {
        ...state,
        allCardTasks: { ...allCardTasks },
      };
    }
    case CREATE_TASK: {
      const newTask = action.cardTask;
      return {
        ...state,
        allCardTasks: {
          ...state.allCardTasks,
          [newTask.id]: newTask,
        },
      };
    }
    case GET_TASK_BY_ID: {
      const currentCardTask = action.cardTask;
      return { ...state, currentCardTask: currentCardTask };
    }
    case EDIT_TASK: {
      const updatedTask = action.task;
      return {
        ...state,
        allCardTasks: {
          ...state.allCardTasks,
          [updatedTask.id]: updatedTask,
        },
        currentCardTask:
          updatedTask.id === state.currentCardTask.id
            ? updatedTask
            : state.currentCardTask,
      };
    }
    case DELETE_TASK: {
      const newCardTasks = { ...state.allCardTasks };
      delete newCardTasks[action.taskId];
      return {
        ...state,
        allCardTasks: newCardTasks,
        currentCardTask:
          state.currentCardTask.id === action.taskId
            ? {}
            : state.currentCardTask,
      };
    }
    default:
      return state;
  }
};

export default cardsReducer;
