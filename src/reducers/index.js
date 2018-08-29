import { combineReducers, createStore, applyMiddleware } from 'redux';
import NavigationReducer from './NavigationReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const AppReducers = combineReducers({
  NavigationReducer
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

export default store;
