import React from 'react'
import {
  Alert,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import cssStyles from '../css/styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Padding from '../components/Padding'

const BILLFOLD = require('img/billfold-revised1024.png')
const PLUS_ADD = require('img/plus_add1024.png')
const LOGOUT = require('img/ndau_user1024.png')

class DashboardDrawer extends React.Component {
  constructor (props) {
    super(props)
  }

  dashboard = () => {
    this.props.navigation.closeDrawer()
    this.props.navigation.navigate('App')
  }

  addOrRecoverWallet = async () => {
    this.props.navigation.closeDrawer()
    this.props.navigation.navigate('SetupWelcome')
  }

  logout = () => {
    this.props.navigation.closeDrawer()
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out of ndau wallet?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Auth')
          }
        }
      ],
      { cancelable: false }
    )
  }

  logging = () => {
    this.props.navigation.closeDrawer()
    this.props.navigation.navigate('Logging')
  }

  render () {
    return (
      <ScrollView>
        <SafeAreaView
          style={cssStyles.drawerContainer}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <Padding>
            <TouchableOpacity onPress={() => this.dashboard()}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={cssStyles.drawerTextImageDashboard}
                  source={BILLFOLD}
                />
                <Text style={cssStyles.drawerText}>Wallets</Text>
              </View>
            </TouchableOpacity>
          </Padding>

          <Padding>
            <TouchableOpacity
              style={{ marginTop: hp('1.5%') }}
              onPress={() => this.addOrRecoverWallet()}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[cssStyles.drawerTextImageDashboard, { width: 35 }]}
                  source={PLUS_ADD}
                />
                <Text style={cssStyles.drawerText}>Add or recover wallet</Text>
              </View>
            </TouchableOpacity>
          </Padding>

          <Padding>
            <View
              style={{
                borderBottomColor: '#555',
                borderBottomWidth: 1,
                marginTop: hp('1.5%'),
                marginBottom: hp('1.5%')
              }}
            />
          </Padding>

          <Padding>
            <TouchableOpacity onPress={() => this.logging()}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={cssStyles.drawerTextImage} source={LOGOUT} />
                <Text style={cssStyles.drawerText}>Logging</Text>
              </View>
            </TouchableOpacity>
          </Padding>

          <Padding>
            <TouchableOpacity onPress={() => this.logout()}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={cssStyles.drawerTextImage} source={LOGOUT} />
                <Text style={cssStyles.drawerText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </Padding>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default DashboardDrawer
