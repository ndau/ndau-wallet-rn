import React, { Component } from 'react';
import { PixelRatio, StyleSheet, View, ScrollView, Text, NativeModules, Alert } from 'react-native';
import groupIntoRows from '../helpers/groupIntoRows';
import CommonButton from '../components/CommonButton';
import SetupProgressBar from '../components/SetupProgressBar';
import RNExitApp from 'react-native-exit-app';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AppConstants from '../AppConstants';

var _ = require('lodash');

const DEFAULT_ROW_LENGTH = 3; // 3 items per row

class SetupRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryPhrase: []
    };

    this.boxWidth = '30%';
    this.boxHeight = '18%';
    this.rowLength = DEFAULT_ROW_LENGTH;
    // if someone has cranked up the font use 1 row instead
    console.log(`PixelRatio.getFontScale is ${PixelRatio.getFontScale()}`);
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1;
      this.boxWidth = '100%';
      this.boxHeight = '30%';
      console.log(`boxWidth: ${this.boxWidth} and boxHeight: ${this.boxHeight}`);
    }
  }

  componentDidMount = () => {
    this.generateRecoveryPhrase();
  };

  showExitApp() {
    Alert.alert(
      '',
      `Problem occurred validating the phrase, please contact Oneiro.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp();
          }
        }
      ],
      { cancelable: false }
    );
  }

  generateRecoveryPhrase = async () => {
    console.debug(`entropy in generateRecoveryPhrase is ${SetupStore.entropy}`);
    const KeyaddrManager = NativeModules.KeyaddrManager;
    const seeds = await KeyaddrManager.keyaddrWordsFromBytes(
      AppConstants.APP_LANGUAGE,
      SetupStore.entropy
    );
    const seedBytes = await KeyaddrManager.keyaddrWordsToBytes(AppConstants.APP_LANGUAGE, seeds);
    if (!_(seedBytes).isEqual(SetupStore.entropy)) {
      this.showExitApp();
    } else {
      console.debug(`${seedBytes} and ${SetupStore.entropy} are equal.`);
    }
    console.debug(`keyaddr's seed words are: ${seeds}`);
    const recoveryPhrase = seeds.split(/\s+/g);
    this.setState({ recoveryPhrase: recoveryPhrase });

    // Shuffle the deck with a Fisher-Yates shuffle algorithm;
    // walks through the array backwards once, exchanging each value
    // with a random element from the remainder of the array
    let map = recoveryPhrase.map((e, i) => i);
    let arr = recoveryPhrase.slice();
    for (let i = arr.length - 1; i >= 0; i--) {
      let r = Math.floor(Math.random() * i);
      [ map[i], map[r] ] = [ map[r], map[i] ];
      [ arr[i], arr[r] ] = [ arr[r], arr[i] ];
    }
    this.shuffledWords = arr;
    // turn array inside out
    this.shuffleMap = map.reduce((a, c, i) => {
      a[c] = i;
      return a;
    }, []);
  };

  showNextSetup = () => {
    SetupStore.recoveryPhrase = this.state.recoveryPhrase;
    SetupStore.shuffledMap = this.shuffleMap;
    SetupStore.shuffledWords = this.shuffledWords;

    const { navigation } = this.props;
    navigation.navigate('SetupConfirmRecoveryPhrase', {
      walletSetupType: navigation.state.params && navigation.state.params.walletSetupType,
    });
  };

  render() {
    // chop the words into DEFAULT_ROW_LENGTH-tuples
    const words = groupIntoRows(this.state.recoveryPhrase, this.rowLength);
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      }
    };

    let count = 1;
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer} keyboardShouldPersistTaps="always">
            <SetupProgressBar />
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                Write this 12-word phrase down and store it in a secure location.
              </Text>
            </View>
            {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={cssStyles.rowView}>
                  {row.map((item, index) => {
                    return (
                      <View key={index} style={styles.rowTextView}>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontFamily: 'TitilliumWeb-Regular',
                            textAlign: 'center'
                          }}
                        >
                          {count++}.{'\n'}
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton onPress={this.showNextSetup} title="I wrote it down" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupRecoveryPhrase;
