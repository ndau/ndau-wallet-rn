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

class SetupUserId extends Component {
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
      screen: 'ndau.SetupEncryptionPassword'
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
              <Text style={styles.text}>Verify your user number </Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.125}
                  style={styles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.125} style={styles.progress} />
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
    paddingTop: 15,
    paddingBottom: 15
  },
  textInput: {
    height: 45,
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

export default SetupUserId;
