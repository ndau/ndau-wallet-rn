import * as types from '../actions/ActionTypes';

const CounterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case types.COUNTER_INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case types.COUNTER_DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      });
    default:
      return state;
  }
};

export default CounterReducer;
