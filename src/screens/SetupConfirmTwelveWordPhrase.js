import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  ProgressViewIOS,
  Platform,
  ProgressBarAndroid,
  SafeAreaView
} from 'react-native';
import CheckBox from 'react-native-check-box';

class SetupConfirmTwelveWordPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupTermsOfService',
      screen: 'ndau.SetupTermsOfService',
      passProps: { props: this.props }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>Config twelve-word phrase</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.75}
                  style={styles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.75} style={styles.progress} />
              )}
            </View>
            <View>
              <Text style={styles.text}>
                Demonstrate that you wrote the phrase down by tapping them in order.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.onPushAnother} title="Next" />
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
  },
  progress: {
    paddingTop: 30,
    paddingBottom: 30
  }
});

export default SetupConfirmTwelveWordPhrase;