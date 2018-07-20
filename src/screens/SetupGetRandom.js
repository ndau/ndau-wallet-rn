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
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import Randal from '../helpers/randal.js';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

class SetupGetRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entropy: '',
      percentage: 0,
      doneDisabled: true
    };
    this.randal = new Randal()
    this.randal.onUpdate(() => {
      this.setState({
        entropy: this.randal.hash.toString().substr(0, 16),
        percentage: this.randal.getPercentage()
      })
    })
    this.randal.onDone(() => {
      this.setState({ doneDisabled: false })
    })
  }

  onPushAnother = async () => {
    this.props.navigator.push({
      label: 'SetupYourWallet',
      screen: 'ndau.SetupYourWallet',
      passProps: {
        encryptionPassword: this.props.password,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        entropy: this.state.entropy,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.state.numberOfAccounts
      }
    });
  };

  handleScribble(evt) {
    this.randal.checkPoint(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Get random</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.375}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.375} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                To generate the strongest possible encryption, we need a source of random input.
                Scribble in the box below to add randomness to your key.
              </Text>
            </View>
            <View>
              <ProgBar percentage={this.state.percentage} />
              <View
                onStartShouldSetResponderCapture={() => true}
                onResponderMove={(evt) => this.handleScribble(evt)}
                style={styles.scribbleArea}
              >
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button disabled={this.state.doneDisabled} color="#4d9678" onPress={this.onPushAnother} title="Done" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function ProgBar(props) {
  let percentage = Math.min(props.percentage, 100)
  return (<View style={{
    height: 20,
    flex: 1,
    backgroundColor: 'grey',
    marginBottom: 20,
    marginTop: 10
  }}>
    <View style={{
      height: 20,
      backgroundColor: percentage == 100 ? '#4d9678' : 'yellow',
      width: String(percentage) + "%"
    }}></View>
  </View>)
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
  },
  progress: {
    paddingTop: 30,
    paddingBottom: 30
  },
  scribbleArea: {
    backgroundColor: 'white',
    flex: 1,
    height: 200,
  }
});

export default SetupGetRandom;
