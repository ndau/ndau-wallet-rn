import React from 'react';
import { Alert, ScrollView, SafeAreaView } from 'react-native';
import Row from '../components/Row';
import cssStyles from '../css/styles';
import UserStore from '../model/UserStore';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you would like to logout of ndau wallet?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            UserStore.setUser({});
            this.props.navigation.navigate('Auth');
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <ScrollView style={cssStyles.container}>
          <Row title={'Logout'} onPress={this.logout} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Settings;
