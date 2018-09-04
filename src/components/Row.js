import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';

class Row extends React.PureComponent {
  render() {
    const { title, onPress, onPressIn, platform, testID } = this.props;
    if (platform && platform !== Platform.OS) {
      return <View />;
    }

    return (
      <TouchableHighlight
        onPress={onPress}
        onPressIn={onPressIn}
        testID={testID}
        underlayColor={'rgba(255, 255, 255, 0.054)'}
      >
        <View style={styles.row}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onPressIn: PropTypes.func
};

const styles = StyleSheet.create({
  row: {
    height: 68,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.054)'
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

export default Row;
