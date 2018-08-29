import { combineReducers, createStore, applyMiddleware } from 'redux';
import CounterReducer from './CounterReducer';
import NavigationReducer from './NavigationReducer';
import CSSReducer from './CSSReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const AppReducers = combineReducers({
  CounterReducer,
  NavigationReducer,
  CSSReducer
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

// const store = createStoreWithMiddleware(rootReducer);
const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

export default store;
