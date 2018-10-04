import React, { Component } from 'react';
import { PixelRatio, StyleSheet, View, ScrollView, Text, NativeModules, Alert } from 'react-native';
import groupIntoRows from '../helpers/groupIntoRows';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

var _ = require('lodash');

const DEFAULT_ROW_LENGTH = 3; // 3 items per row

class SetupGetRecoveryPhraseConfirmation extends Component {
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

  pushBack = () => {
    this.props.navigation.navigate('SetupGetRecoveryPhraseConfirmation');
  };

  //TODO: implement
  _confirmRecoverPhrase = () => {
    return true;
  };

  confirm = () => {
    if (this._confirmRecoverPhrase()) {
      this.props.navigation.navigate('Dashboard');
    }
  };

  render() {
    // chop the words into DEFAULT_ROW_LENGTH-tuples
    const words = groupIntoRows(this.props.recoveryPhrase, this.rowLength);
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
            <Stepper screenNumber={6} />
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
            <View style={styles.navButtonWrapper}>
              <CommonButton onPress={() => this.pushBack()} title="Back" />
            </View>
            <View style={styles.navButtonWrapper}>
              <CommonButton onPress={() => this.confirm()} title="Confirm" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupGetRecoveryPhraseConfirmation;
