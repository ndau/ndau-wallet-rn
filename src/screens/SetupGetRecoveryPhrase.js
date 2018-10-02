import React, { Component } from 'react';
import { PixelRatio, StyleSheet, View, ScrollView, Text, NativeModules, Alert } from 'react-native';
import groupIntoRows from '../helpers/groupIntoRows';
import CommonButton from '../components/CommonButton';
import RNExitApp from 'react-native-exit-app';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import RecoveryDropdown from '../components/RecoveryDropdown';

var _ = require('lodash');

const DEFAULT_ROW_LENGTH = 3; // 3 items per row

class SetupRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryPhrase: [ '', '', '', '', '', '', '', '', '', '', '', '' ]
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

  componentDidMount = () => {};

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

  verify = () => {};

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
          <ScrollView style={cssStyles.contentContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                To verify your account please verify your twelve-word recovery phrase below. Start
                typing, then pick the correct suggestion.
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
                            textAlign: 'center',
                            paddingBottom: 0,
                            marginBottom: 0,
                            height: hp('5%')
                          }}
                        >
                          {count++}.
                        </Text>
                        <RecoveryDropdown />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.verify} title="Verify" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupRecoveryPhrase;
