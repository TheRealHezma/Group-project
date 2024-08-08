import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import boardsReducer from './board';
import cardsReducer from './card';
import listsReducer from './list';

// import commentsReducer from './comment'; //check if needed

const rootReducer = combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  cards: cardsReducer,
  lists: listsReducer,

  // comment: commentsReducer, //check if needed
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
