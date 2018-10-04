import React, { Component } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import RecoveryDropdown from '../components/RecoveryDropdown';
import Carousel from 'react-native-looped-carousel';
import { Dialog } from 'react-native-simple-dialogs';

var _ = require('lodash');

class SetupGetRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width: wp('20%'), height: hp('50%') },
      dialogVisible: false
    };

    this.recoveryPhrase = [ '', '', '', '', '', '', '', '', '', '', '', '' ];
  }

  addToRecoveryPhrase = (value, index) => {
    this.recoveryPhrase[index] = value;
    console.log(`recoverPhrase is now: ${this.recoveryPhrase}`);
  };

  noRecoveryPhrase = () => {
    this.setState({ dialogVisible: true });
  };

  sendEmail = () => {
    Linking.openURL('mailto:john.pasqualetto@oneiro.io?subject=Lost Recovery Phrase');
  };

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  _generatePages = () =>
    this.recoveryPhrase.map((phrase, i) => (
      <View style={[ cssStyles.recoveryPageView, this.state.size ]} key={i}>
        <Text style={[ cssStyles.wizardText, { marginTop: hp('1%'), marginRight: wp('2%') } ]}>
          {i + 1}.
        </Text>
        <RecoveryDropdown addToRecoveryPhrase={this.addToRecoveryPhrase} index={i} />
      </View>
    ));

  render() {
    const pages = this._generatePages();

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
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
              <Carousel
                style={this.state.size}
                leftArrowText={'＜'}
                leftArrowStyle={cssStyles.carouselArrows}
                rightArrowText={'＞'}
                rightArrowStyle={cssStyles.carouselArrows}
                pageInfo
                pageInfoTextStyle={cssStyles.smallWhiteText}
                arrows
                isLooped={false}
                autoplay={false}
                onAnimateNextPage={(p) => console.log(p)}
              >
                {pages}
              </Carousel>
            </View>
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
              john.pasqualetto@oneiro.io
            </Text>
          </View>
        </Dialog>
      </SafeAreaView>
    );
  }
}

export default SetupGetRecoveryPhrase;
