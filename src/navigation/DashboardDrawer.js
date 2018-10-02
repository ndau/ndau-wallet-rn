import React from 'react';
import { Alert, ScrollView, SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import cssStyles from '../css/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class DashboardDrawer extends React.Component {
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
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={cssStyles.drawerTextImage}
                source={require('../../img/billfold-revised.png')}
              />
              <Text style={cssStyles.drawerText}>Dashboard</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginTop: hp('1.5%'),
              marginBottom: hp('1.5%')
            }}
          />
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={cssStyles.drawerTextImage}
                source={require('../../img/ndau_user.png')}
              />
              <Text style={cssStyles.drawerText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default DashboardDrawer;
