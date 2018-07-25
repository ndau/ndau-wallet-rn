import { mount } from 'enzyme';
import React from 'react';
import { StyleSheet } from 'react-native';
import SetupGetRandom from '../SetupGetRandom';

import renderer from 'react-test-renderer';

const makeStyles = () => StyleSheet.create({
  wizardText: {
    color: '#ffffff',
    fontSize: 20
  }
});

describe('SetupGetRandom snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SetupGetRandom parentStyles={makeStyles()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})

describe('SetupGetRandom behavior', () => {
  beforeEach(() => {
    // set up default wrapper for every test.
    this.wrapper = mount(<SetupGetRandom parentStyles={makeStyles()} />, this.context);
  });

  it('done button starts disabled', () => {
    const onlyButton = this.wrapper.find('Button').at(0);
    expect(onlyButton.prop('disabled')).toBeTruthy();
  });

  it('done button starts disabled', () => {
    const onlyButton = this.wrapper.find('Button').at(0);
    expect(onlyButton.prop('disabled')).toBeTruthy();
  });

  // This calls a handler method on the component with mock data and the scope.
  // Then it updates the wrapper and inspects the subcomponent's properties.
  it('after scribbling done button is enabled', () => {
    const instance = this.wrapper.instance();
    const handler = instance.handleScribble;
    let flipper = -1;
    const x = 500; // random position
    // scribble for an arbitrary amount of time
    for (var i = 0; i < 2048; i++) {
      handler.apply(instance, [{
        nativeEvent: {
          locationX: x * flipper,
          locationY: x * flipper
        }
      }]);
      flipper *= -1;
    }
    this.wrapper.update(); // important
    const doneButton = this.wrapper.find('Button').at(0);
    expect(doneButton.prop('disabled')).toBeFalsy();
  });
});
