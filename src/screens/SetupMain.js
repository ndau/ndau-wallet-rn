import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  SafeAreaView,
  NativeModules
} from 'react-native';

class SetupMain extends Component {
  constructor(props) {
    super(props);
  }

  onPushAnother = async () => {
    this.props.navigator.push({
      label: 'SetupUserId',
      screen: 'ndau.SetupUserId',
      passProps: {
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Welcome to ndau, a cryptocurrency designed to be a buoyant long-term store of value.{'\n'}
              </Text>
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Currently, ndau is only available to accredited investors. You will need to have
                made your purchase through our site and have you six-digit ID code ready in order to
                access this app before launch.{'\n'}
              </Text>
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                To get you started securely, you will create a new wallet, protect this app with
                password, and create a twelve-word phrase which you will need in order to restore
                your wallet if you lose access to it.{'\n'}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              style={this.props.parentStyles.button}
              color="#4d9678"
              onPress={this.onPushAnother}
              title="Create new wallet"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#1c2227'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  }
});

export default SetupMain;
