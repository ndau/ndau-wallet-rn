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
      password: '',
      confirmPassword: ''
    };
  }

  usePassword(event) {
    this.onPushAnother(event);
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

  onPopToRoot = () => {
    this.props.navigator.popToRoot();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.text}>Encrypt your data</Text>
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
              DAta in this app will be encrypted to protect your ndau. You will need to enter a
              password to decrypt it whenever you are in this app.
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(userId) => this.setState({ password })}
            value={this.state.password}
            placeholder="Enter a password"
            placeholderTextColor="#f9f1f1"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(userId) => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#f9f1f1"
          />
        </ScrollView>
        <View style={styles.footer}>
          <Button color="#4d9678" onPress={this.usePassword} title="Next" />
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
