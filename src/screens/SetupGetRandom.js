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

class SetupGetRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entropy: 'ZWEQAwQFBgcICQoLDA0ODw=='
    };
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  onPushAnother = async () => {
    this.props.navigator.push({
      label: 'SetupYourWallet',
      screen: 'ndau.SetupYourWallet',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        entropy: this.state.entropy,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true
      }
    });
  };

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
            <TextInput
              style={styles.textInput}
              onChangeText={(entropy) => this.setState({ entropy })}
              value={this.state.entropy}
              placeholder="Scribble area"
              placeholderTextColor="#333"
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
