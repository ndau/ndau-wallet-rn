import * as Actions from './ActionTypes';

export const push = (screen) => {
  return function(dispatch) {
    dispatch({ type: Actions.PUSH_SCREEN, screen });
  };
};
