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
import bip39 from 'react-native-bip39';

class SetupTwelveWordPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twelveWordPhrase: ''
    };
  }

  componentDidMount = () => {
    // defaults to BIP39 English word list
    // uses HEX strings for entropy
    const mnemonic = bip39.entropyToMnemonic('133755ff');
    this.setState({ twelveWordPhrase: mnemonic });
    console.log(`here is the mnemonic: ${mnemonic}`);
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupConfirmTwelveWordPhrase',
      screen: 'ndau.SetupConfirmTwelveWordPhrase',
      passProps: { encryptionPassword: this.props.password, userId: this.props.userId }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>Twelve-word phrase</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.625}
                  style={styles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.625} style={styles.progress} />
              )}
            </View>
            <View>
              <Text style={styles.text}>
                Write this phrase down. You will want to store it in a secure location.
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.onPushAnother} title="I wrote it down" />
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

export default SetupTwelveWordPhrase;
