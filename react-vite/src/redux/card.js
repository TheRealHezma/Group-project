//*VARIABLE TYPES
const GET = 'cards/LOAD';
const GET_BY_ID = 'cards/LOADONE'

//*ACTIONS

// get all cards for a specific list id
const getCards = (cards) => {
    return {
        type: GET,
        cards,
    };
};
// get a card by card id
const getCardById = (card) => {
    return {
        type: GET_BY_ID,
        card,
    }
}

//*THUNKS
export const getAllCards = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/cards`);

    const allListCards = await response.json();
    dispatch(getCards(allListCards));
}

export const getCard = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardId}`) ;

  const card = await response.json();
  dispatch(getCardById(card));
}

//*INITIAL STATE + REDUCER
const initialState = { allCards: {}, currentCard: {} };

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
    case GET_BY_ID: {
        const currentCard = action.card;
        return { ...state, currentCard: currentCard }
    }
    default:
      return state;
  }
};

export default cardsReducer
