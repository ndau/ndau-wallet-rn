import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

class SetupMain extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'PreviewActionPress') {
      if (event.id === 'action-cancel') {
        Alert.alert('Cancelled');
      }
      if (event.id === 'action-delete-sure') {
        Alert.alert('Deleted');
      }
    }
  }

  onPushAnother = () => {
    this.props.navigator.push({
      screen: 'example.Types.Push',
      title: `Screen ${this.props.count || 1}`,
      passProps: {
        count: this.props.count ? this.props.count + 1 : 2
      }
    });
  };

  onResetTo = () => {
    this.props.navigator.resetTo({
      label: 'Navigation',
      screen: 'example.Types',
      icon: require('../../img/list.png'),
      title: 'Navigation Types'
    });
  };

  onPopToRoot = () => {
    this.props.navigator.popToRoot();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to ndau, a cryptocurrency designed to a long term store of value.{'\t'}
        </Text>
        <Text style={styles.text}>
          Currently, ndau is only available to accredited investors. You will need to have made your
          purchase through our site and have you six-digit ID code ready in order to access this app
          before launch.{'\t'}
        </Text>
        <Text style={styles.text}>
          To get you started securely, you will create a new wallet, protect this app with password,
          and create a twelve-word phrase which you will need in order to restore your wallet if you
          lose access to it.{'\t'}
        </Text>
        <View style={styles.button}>
          <Button onPress={this.onPushAnother} title="Push Another Screen" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 3,
    paddingBottom: 10,
    backgroundColor: '#333333'
  },
  button: {
    marginTop: 0
  },
  text: {
    color: '#4d9678',
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

export default SetupMain;
