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
  SafeAreaView,
  Alert
} from 'react-native';

class SetupUserId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ''
    };
  }

  onPushAnother = () => {
    if (this.state.userId) {
      this.props.navigator.push({
        label: 'SetupEncryptionPassword',
        screen: 'ndau.SetupEncryptionPassword',
        passProps: {
          userId: this.state.userId,
          parentStyles: this.props.parentStyles,
          iconsMap: this.props.iconsMap
        }
      });
    } else {
      Alert.alert(
        'Error',
        'Please enter a value for the user ID.',
        [ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Verify your user number </Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.125}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.125} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                In order to deliver your ndau to this wallet on Genesis Day, we need the six-digit
                code you use to access the ndau dashboard.
              </Text>
            </View>
            <TextInput
              style={this.props.parentStyles.textInput}
              onChangeText={(userId) => this.setState({ userId })}
              value={this.state.userId}
              placeholder="Enter your unique User ID"
              placeholderTextColor="#333"
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

export default SetupUserId;
