import React, { Component } from 'react';

import { StyleSheet, Image } from 'react-native';

const imageMap = new Map();

class Stepper extends Component {
  constructor(props) {
    super(props);

    imageMap.set(1, require('../../img/step-1.png'));
    imageMap.set(2, require('../../img/step-2.png'));
    imageMap.set(3, require('../../img/step-3.png'));
    imageMap.set(4, require('../../img/step-4.png'));
    imageMap.set(5, require('../../img/step-5.png'));
    imageMap.set(6, require('../../img/step-6.png'));
    imageMap.set(7, require('../../img/step-7.png'));
    imageMap.set(8, require('../../img/step-8.png'));
  }

  render() {
    return (
      <Image
        style={styles.stepper}
        source={imageMap.get(this.props.screenNumber)}
        resizeMode="contain"
        {...this.props}
      />
    );
  }
}

var styles = StyleSheet.create({
  stepper: {
    width: '100%',
    height: 60,
    backgroundColor: 'transparent'
  }
});

export default Stepper;
