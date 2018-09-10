import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    AsyncStorageHelper.getAllKeys()
      .then((userIds) => {
        console.debug(`userIds is ${userIds}`);

        if (userIds.length > 0) {
          this.props.navigation.navigate('Auth');
        } else {
          this.props.navigation.navigate('Setup');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={cssStyles.container}>
        <ActivityIndicator />
        {/* <StatusBar barStyle="light-content" /> */}
      </View>
    );
  }
}

export default AuthLoadingScreen;
