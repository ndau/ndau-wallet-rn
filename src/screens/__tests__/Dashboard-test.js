import React from 'react';
import DashBoard from '../DashBoard';

import renderer from 'react-test-renderer';

describe('testing Dashboard...', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('renders correctly', () => {
    //Mock out the targetPrice call here
    fetch.mockResponseOnce('12.77');

    const tree = renderer.create(<DashBoard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
