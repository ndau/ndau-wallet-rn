import React, { Component } from 'react';
import { View } from 'react-native';
// import { withNavigation } from 'react-navigation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProgressBar from './ProgressBar';


export const NEW_WALLET_SETUP_TYPE = 'new';
export const RECOVERY_WALLET_SETUP_TYPE = 'recovery';

const NEW_WALLET_SCREENS = {
  SetupYourWallet: 1,
  SetupRecoveryPhrase: 2,
  SetupConfirmRecoveryPhrase: 3,
  SetupWalletName: 4,
  SetupEncryptionPassword: 5,
  SetupTermsOfService: 6,

  //meta
  numberOfSteps: 6,
};

const RECOVERY_SCREENS = {
  SetupGetRecoveryPhrase: 1,
  SetupWalletName: 14,
  SetupEncryptionPassword: 15,
  SetupTermsOfService: 16,

  //meta
  numberOfSteps: 16,
};

class SetupProgressBar extends Component {
  constructor(props) {
    super(props);
    
    const { navigation } = props;
    const { routeName, params={} } = navigation && navigation.state || {};
    const { walletSetupType } = params;
    this.routeName = routeName;
    this.walletSetupType = walletSetupType;

    this.screens = {};
    if(this.walletSetupType === NEW_WALLET_SETUP_TYPE) {
      this.screens = NEW_WALLET_SCREENS;
    }
    else if(this.walletSetupType === RECOVERY_WALLET_SETUP_TYPE) {
      this.screens = RECOVERY_SCREENS;
    }

    this.screenNumber = this.screens[this.routeName];
    this.numberOfSteps = this.screens.numberOfSteps;
  }

  render() {
    if(!this.walletSetupType || !this.screenNumber) {
      return (
        // placeholder for consistent spacing in UI
        <View style={{marginBottom: hp('7%')}}></View> 
      );
    }

    let step = this.screenNumber;

    if(this.props.stepNumber) {
      step = this.screenNumber + this.props.stepNumber;
    }

    const progress = (100 / this.numberOfSteps) * step;

    return (
      <View style={{marginBottom: hp('3%')}}>
        <ProgressBar
          progress={progress}
          currentStep={step}
          numberOfSteps={this.numberOfSteps}
          showSteps
        />
      </View>
    );
  }
}

export default SetupProgressBar;
