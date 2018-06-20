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
  TextInput
} from 'react-native';

class SetupUserToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ''
    };
  }

  verifySixDigitCode(event) {
    this.onPushAnother();
  }

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupEncryptionPassword',
      screen: 'ndau.SetupEncryptionPassword',
      title: 'Setup Encryption Password',
      passProps: { props: this.props }
    });
  };

  onPopToRoot = () => {
    this.props.navigator.popToRoot();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.text}>Verify your user number </Text>
          </View>
          <View>
            {Platform.OS === 'android' ? (
              <ProgressBarAndroid styleAttr="Horizontal" progress={0.125} style={styles.progress} />
            ) : (
              <ProgressViewIOS
                trackTintColor="#4d9678"
                progressTintColor="#dea85a"
                progress={0.125}
                style={styles.progress}
              />
            )}
          </View>
          <View>
            <Text style={styles.text}>
              In order to deliver your ndau to this wallet on Genesis Day, we need the six-digit
              code you use to access the ndau dashboard.
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(userId) => this.setState({ userId })}
            value={this.state.userId}
            placeholder="Enter your unique ndau ID"
            placeholderTextColor="#f9f1f1"
          />
        </ScrollView>
        <View style={styles.footer}>
          <Button color="#4d9678" onPress={this.onPushAnother} title="Verify" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 30,
    paddingRight: 50
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 10,
    color: '#ffffff'
  }
});

export default SetupUserToken;
