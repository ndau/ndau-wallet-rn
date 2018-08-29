import * as Actions from '../actions/ActionTypes';
import { getNav } from '../helpers/navigator';

const NavigationReducer = (state = { root: undefined }, action = {}) => {
  let nav = getNav();
  switch (action.type) {
    case Actions.PUSH_SCREEN:
      nav.push({
        screen: action.screen,
        label: action.screen
      });
      return { ...state };
    default:
      return state;
  }
};

export default NavigationReducer;
