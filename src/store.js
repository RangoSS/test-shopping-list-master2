import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import (named import)
import authReducer from './components/reducers/authReducer';
import shoppingListReducer from './components/reducers/shoppingListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingLists: shoppingListReducer
});

// Custom middleware for logging Redux actions
const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  console.log('previous state', store.getState());
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware) // Apply the middleware
);

export default store;
