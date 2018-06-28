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
  TextInput,
  SafeAreaView
} from 'react-native';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

class SetupGetRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPushAnother = async () => {
    console.log(``);
    const user = await AsyncStorageHelper.getUser(this.props.encryptionPassword);

    this.props.navigator.push({
      label: 'SetupYourWallet',
      screen: 'ndau.SetupYourWallet',
      passProps: { encryptionPassword: this.props.password, userId: this.props.userId }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={styles.text}>Get random</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.375}
                  style={styles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.375} style={styles.progress} />
              )}
            </View>
            <View>
              <Text style={styles.text}>
                To generate the strongest possible encryption, we need a source of random input.
                Scribble in the box below to add randomness to your key.
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder="Scribble area"
              placeholderTextColor="#f9f1f1"
              secureTextEntry={!this.state.showPasswords}
            />
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.onPushAnother} title="Done" />
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
  },
  textInput: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

export default SetupGetRandom;
