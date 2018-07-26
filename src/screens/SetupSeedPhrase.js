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
  NativeModules
} from 'react-native';

class SetupSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedPhrase: []
    };
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
    this.generateSeedPhrase();
  };

  generateSeedPhrase = async () => {
    const KeyaddrManager = NativeModules.KeyaddrManager;
    const seeds = await KeyaddrManager.KeyaddrWordsFromBytes('en', this.props.entropy);
    console.debug(`keyaddr's seed words are: ${seeds}`);
    this.setState({ seedPhrase: seeds.split(/\s+/g) });
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupConfirmSeedPhrase',
      screen: 'ndau.SetupConfirmSeedPhrase',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        entropy: this.props.entropy,
        seedPhraseArray: this.state.seedPhrase,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      }
    });
  };

  render() {
    const firstThree = this.state.seedPhrase.slice(0, 3);
    const secondThree = this.state.seedPhrase.slice(3, 6);
    const thirdThree = this.state.seedPhrase.slice(6, 9);
    const fourthThree = this.state.seedPhrase.slice(9, 12);
    let count = 1;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Seed phrase</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.625}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={0.625} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Write this phrase down. You will want to store it in a secure location.
              </Text>
            </View>
            <View style={styles.rowView}>
              {firstThree.map((item, index) => {
                return (
                  <View key={index} style={styles.rowTextView}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        textAlign: 'center'
                      }}
                    >
                      {count++}. {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.rowView}>
              {secondThree.map((item, index) => {
                return (
                  <View key={index} style={styles.rowTextView}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        textAlign: 'center'
                      }}
                    >
                      {count++}. {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.rowView}>
              {thirdThree.map((item, index) => {
                return (
                  <View key={index} style={styles.rowTextView}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        textAlign: 'center'
                      }}
                    >
                      {count++}. {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.rowView}>
              {fourthThree.map((item, index) => {
                return (
                  <View key={index} style={styles.rowTextView}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        textAlign: 'center'
                      }}
                    >
                      {count++}. {item}
                    </Text>
                  </View>
                );
              })}
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
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  rowTextView: {
    height: 60,
    width: 100,
    marginBottom: 10,
    marginTop: 10
  }
});

export default SetupSeedPhrase;
