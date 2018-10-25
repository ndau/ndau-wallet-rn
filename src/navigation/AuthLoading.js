import React from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';
import MultiSafe from '../model/MultiSafe';
import ErrorDialog from '../components/ErrorDialog';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const userIds = await AsyncStorageHelper.getAllKeys();
      const multiSafes = await MultiSafe.isAMultiSafePresent();
      if (userIds.length > 0 && !multiSafes) {
        //time for recovery as we need to create real account object for you
        //this is only done for users < 1.8, after 1.8 this should not happen
        //again as you will have a MultiSafe
        this.props.navigation.navigate('SetupGetRecoveryPhrase');
      } else if (multiSafes) {
        this.props.navigation.navigate('Auth');
      } else {
        let isMainNetAlive = false;
        try {
          isMainNetAlive = await NdauNodeAPIHelper.isMainNetAlive();
        } catch (error) {
          console.warn(`Unable to talk to MainNet: ${error}`);
        }
        if (isMainNetAlive) {
          this.props.navigation.navigate('SetupWelcome');
        } else {
          this.props.navigation.navigate('Setup');
        }
      }
    } catch (error) {
      ErrorDialog.showError(`Problem encountered: ${error}`);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={cssStyles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingScreen;
