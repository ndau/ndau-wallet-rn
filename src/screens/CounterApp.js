import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../reducers/index';
import CounterAction from '../actions/CounterAction';

export default class CounterApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <CounterAction />
      </Provider>
    );
  }
}
