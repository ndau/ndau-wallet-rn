import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, SafeAreaView } from 'react-native';

class SetupMain extends Component {
  constructor(props) {
    super(props);
  }

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupUserId',
      screen: 'ndau.SetupUserId',
      passProps: { props: this.props }
    });
  };

  onResetTo = () => {
    this.props.navigator.resetTo({
      label: 'Dashboard',
      screen: 'ndau.Dashboard'
    });
  };

  onPopToRoot = () => {
    this.props.navigator.popToRoot();
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>
                Welcome to ndau, a cryptocurrency designed to be a buoyant long-term store of value.
              </Text>
            </View>
            <View>
              <Text style={styles.text}>
                Currently, ndau is only available to accredited investors. You will need to have
                made your purchase through our site and have you six-digit ID code ready in order to
                access this app before launch.
              </Text>
            </View>
            <View>
              <Text style={styles.text}>
                To get you started securely, you will create a new wallet, protect this app with
                password, and create a twelve-word phrase which you will need in order to restore
                your wallet if you lose access to it.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.onPushAnother} title="Create new wallet" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

    backgroundColor: '#333333'
  },
  button: {
    marginTop: 0
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  }
});

export default SetupMain;
