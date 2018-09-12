import React from 'react';
import { Alert, ScrollView, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import cssStyles from '../css/styles';
import UserStore from '../model/UserStore';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  dashboard = () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('App');
  };

  logout = () => {
    this.props.navigation.closeDrawer();
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
      <ScrollView>
        <SafeAreaView
          style={cssStyles.drawerContainer}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <TouchableOpacity onPress={() => this.dashboard()}>
            <Text style={cssStyles.drawerText}>Dashboard</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginTop: 15,
              marginBottom: 15
            }}
          />
          <TouchableOpacity onPress={() => this.logout()}>
            <Text style={cssStyles.drawerText}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Settings;
