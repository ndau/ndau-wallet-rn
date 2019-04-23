import React from 'react'
import { Alert, ScrollView, Platform, Linking } from 'react-native'
import VersionNumber from 'react-native-version-number'
import DeviceInfo from 'react-native-device-info'
import {
  DrawerEntryItem,
  DrawerExit,
  DrawerContainer
} from '../components/drawer'

class AppDrawer extends React.Component {
  constructor (props) {
    super(props)
  }

  closeDrawer = () => {
    this.props.navigation.closeDrawer()
  }

  dashboard = () => {
    this.closeDrawer()
    this.props.navigation.navigate('App')
  }

  recoverWallet = async () => {
    this.closeDrawer()
    this.props.navigation.navigate('SetupGetRecoveryPhrase')
  }

  addWallet = async () => {
    this.closeDrawer()
    this.props.navigation.navigate('SetupYourWallet')
  }

  sendSupportEmail = () => {
    this.closeDrawer()
    Linking.openURL(
      `mailto:support@oneiro.freshdesk.com?subject=Wallet App Support - ${this.getVersion()} - ${this.getOs()} - ${this.getHardware()}`
    )
  }

  /* NEED HELP WITH THIS STUFF */

  getHardware () {
    DeviceInfo
    const deviceId = DeviceInfo.getDeviceId()
  }

  getVersion () {
    let version = `V${VersionNumber.appVersion}`
    if (Platform.OS === 'ios') {
      version += `.${VersionNumber.buildVersion}`
    }
    return version
  }

  getOs () {
    if (Platform.OS === 'ios') {
      return 'Apple iOS'
    } else {
      return 'Android os'
    }
  }

  logout = () => {
    this.closeDrawer()
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
            this.props.navigation.navigate('Authentication')
          }
        }
      ],
      { cancelable: false }
    )
  }

  logging = () => {
    this.closeDrawer()
    this.props.navigation.navigate('Logging')
  }

  render () {
    return (
      <DrawerContainer logoutHandler={() => this.logout()}>
        <ScrollView>
          <DrawerExit onPress={() => this.closeDrawer()} />
          <DrawerEntryItem
            onPress={() => this.dashboard()}
            fontAwesomeIconName='home'
          >
            Dashboard
          </DrawerEntryItem>

          <DrawerEntryItem
            onPress={() => this.addWallet()}
            fontAwesomeIconName='plus-square'
          >
            Add wallet
          </DrawerEntryItem>

          <DrawerEntryItem
            onPress={() => this.recoverWallet()}
            fontAwesomeIconName='clock'
          >
            Recover wallet
          </DrawerEntryItem>

          <DrawerEntryItem
            onPress={() => this.sendSupportEmail()}
            fontAwesomeIconName='comment'
          >
            Contact support
          </DrawerEntryItem>

          <DrawerEntryItem>{this.getVersion()}</DrawerEntryItem>

          {/*
          <DrawerEntryItem
            onPress={() => this.logging()}
            fontAwesomeIconName='exclamation-triangle'
          >
            Logging
          </DrawerEntryItem> */}
        </ScrollView>
      </DrawerContainer>
    )
  }
}

export default AppDrawer
