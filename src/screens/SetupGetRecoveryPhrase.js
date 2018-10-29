import React, { Component } from 'react';
import { View, ScrollView, Text, Linking, PixelRatio, Platform } from 'react-native';
import groupIntoRows from '../helpers/groupIntoRows';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import RecoveryDropdown from '../components/RecoveryDropdown';
import Carousel from 'react-native-looped-carousel';
import { Dialog } from 'react-native-simple-dialogs';
import ErrorPanel from '../components/ErrorPanel';
import RecoveryPhaseHelper from '../helpers/RecoveryPhaseHelper';
import MultiSafeHelper from '../helpers/MultiSafeHelper';
import UserData from '../model/UserData';

const DEFAULT_ROW_LENGTH = 3; // 3 items per row
const _ = require('lodash');

class SetupGetRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width: wp('100%'), height: hp('50%') },
      dialogVisible: false,
      recoverPhraseFull: false,
      textColor: '#ffffff',
      confirmationError: false,
      acquisitionError: false
    };

    this.recoveryPhrase = [ '', '', '', '', '', '', '', '', '', '', '', '' ];

    this.boxWidth = '30%';
    this.boxHeight = '13%';
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

  addToRecoveryPhrase = (value, index) => {
    this.recoveryPhrase[index] = value;

    if (this.recoveryPhrase.indexOf('') === -1) {
      this.setState({ recoverPhraseFull: true });
    }
  };

  noRecoveryPhrase = () => {
    this.setState({ dialogVisible: true });
  };

  sendEmail = () => {
    Linking.openURL('mailto:support@oneiro.freshdesk.com?subject=Lost Recovery Phrase');
  };

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  _generatePages = () =>
    this.recoveryPhrase.map((phrase, i) => {
      const style = [ this.state.size, cssStyles.recoveryPageView ];
      if (i === 0) {
        style.push({
          ...Platform.select({
            android: {
              marginLeft: wp('14%')
            }
          })
        });
      }
      return (
        <View style={style} key={i}>
          <Text style={[ cssStyles.wizardText, { marginTop: hp('1%'), marginRight: wp('2%') } ]}>
            {i + 1}.
          </Text>
          <RecoveryDropdown
            addToRecoveryPhrase={this.addToRecoveryPhrase}
            index={i}
            setAcquisitionError={this.setAcquisitionError}
            recoveryPhrase={this.recoveryPhrase}
          />
        </View>
      );
    });
  s;
  _checkRecoveryPhrase = async () => {
    return await RecoveryPhaseHelper.checkRecoveryPhrase(
      this.recoveryPhrase.join().replace(/,/g, ' '),
      this.props.navigation.getParam('user', null)
    );
  };

  setAcquisitionError = (value) => {
    this.setState({ acquisitionError: value });
  };

  confirm = async () => {
    try {
      const user = await this._checkRecoveryPhrase();
      if (user) {
        const encryptionPassword = this.props.navigation.getParam('encryptionPassword', null);
        //IF we have a password we are fixing up an account from a 1.6 user here
        //so we fixed it up...now save it...and go back to Dashboard
        if (encryptionPassword) {
          await UserData.loadData(user);

          await MultiSafeHelper.saveUser(user, encryptionPassword);

          this.props.navigation.navigate('Dashboard', {
            user,
            encryptionPassword
          });
        } else {
          this.props.navigation.navigate('SetupWalletName', { user });
        }
      } else {
        this.setState({
          textColor: '#ff0000',
          confirmationError: true
        });
      }
    } catch (error) {
      this.setState({
        textColor: '#ff0000',
        confirmationError: true
      });
    }
  };

  pushBack = () => {
    this.setState({
      recoverPhraseFull: false,
      confirmationError: false,
      textColor: '#ffffff'
    });
  };

  _renderAcquisition = () => {
    const pages = this._generatePages();

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer} keyboardShouldPersistTaps="always">
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                To verify your account please verify your twelve-word recovery phrase below. Start
                typing, then pick the correct suggestion.
              </Text>
            </View>
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
              <Carousel
                style={this.state.size}
                leftArrowText={'＜'}
                leftArrowStyle={cssStyles.carouselArrows}
                rightArrowText={'＞'}
                rightArrowStyle={cssStyles.carouselArrows}
                pageInfo
                pageInfoTextStyle={cssStyles.smallWhiteText}
                // bullets
                arrows
                isLooped={false}
                autoplay={false}
                onAnimateNextPage={(p) => console.log(p)}
              >
                {pages}
              </Carousel>
            </View>
            {this.state.acquisitionError ? (
              <ErrorPanel errorText={'Please select a valid word.'} />
            ) : null}
          </ScrollView>
          <View style={cssStyles.footer}>
            <Text
              onPress={this.noRecoveryPhrase}
              style={[ cssStyles.linkText, { textAlign: 'center' } ]}
            >
              I don't have my recovery phrase
            </Text>
          </View>
        </View>
        <Dialog
          style={{
            fontSize: 18,
            fontFamily: 'TitilliumWeb-Regular'
          }}
          visible={this.state.dialogVisible}
          // title="Missing Recovery Phrase"
          onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View>
            <Text style={cssStyles.blackDialogText}>
              Your recovery phrase is necessary to prove ownership of your ndau. Your wallet cannot
              be restored without it. If you have lost your recovery phrase please contact{' '}
            </Text>
            <Text onPress={this.sendEmail} style={[ cssStyles.blueLinkText ]}>
              Oneiro concierge support.
            </Text>
          </View>
        </Dialog>
      </SafeAreaView>
    );
  };

  _renderConfirmation = () => {
    const words = groupIntoRows(this.recoveryPhrase, this.rowLength);
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      },
      textStyle: {
        color: this.state.textColor,
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Regular',
        textAlign: 'center'
      }
    };
    let count = 1;

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer} keyboardShouldPersistTaps="always">
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>Is this the correct recovery phrase? </Text>
            </View>
            {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={cssStyles.rowView}>
                  {row.map((item, index) => {
                    return (
                      <View key={index} style={styles.rowTextView}>
                        <Text style={styles.textStyle}>
                          {count++}.{'\n'}
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
            {this.state.confirmationError ? (
              <ErrorPanel
                errorText={'Is this the correct recovery phrase? Please correct any errors.'}
              />
            ) : null}
          </ScrollView>
          <View style={cssStyles.footer}>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton onPress={() => this.pushBack()} title="Back" />
            </View>
            <View style={cssStyles.navButtonWrapper}>
              <CommonButton onPress={() => this.confirm()} title="Confirm" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  render() {
    console.log(`recoverPhrase is now: ${this.recoveryPhrase}`);

    return !this.state.recoverPhraseFull ? this._renderAcquisition() : this._renderConfirmation();
  }
}

export default SetupGetRecoveryPhrase;
