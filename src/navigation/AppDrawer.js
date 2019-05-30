import React from 'react'
import { Alert, ScrollView, Platform, View } from 'react-native'
import VersionNumber from 'react-native-version-number'
import DeviceInfo from 'react-native-device-info'
import {
  DrawerEntryItem,
  DrawerExit,
  DrawerContainer,
  DrawerEntryVersionItem
} from '../components/drawer'
import { DrawerBorder } from '../components/common'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import SettingsStore from '../stores/SettingsStore'
import SupportEmailHelper from '../helpers/SupportEmailHelper'

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
    this.props.navigation.navigate('SetupGetRecoveryPhrase', {
      fromHamburger: true
    })
  }

  addWallet = async () => {
    this.closeDrawer()
    this.props.navigation.navigate('SetupYourWallet', { fromHamburger: true })
  }

  showSettings = async () => {
    this.closeDrawer()
    this.props.navigation.navigate('Settings')
  }

  sendSupportEmail = async () => {
    this.closeDrawer()

    await SupportEmailHelper.sendSupportEmail(
      this.getHardware(),
      this.getOs(),
      this.getVersion()
    )
  }

  getHardware () {
    return DeviceInfo.getManufacturer() + ' ' + DeviceInfo.getModel()
  }

  getVersion () {
    let version = `V${VersionNumber.appVersion}`
    if (Platform.OS === 'ios') {
      version += `.${VersionNumber.buildVersion}`
    }
    return version
  }

  getOs () {
    return DeviceInfo.getManufacturer() + ' ' + DeviceInfo.getSystemName()
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

          <DrawerEntryItem
            onPress={() => this.showSettings()}
            fontAwesomeIconName='cog'
          >
            Settings
          </DrawerEntryItem>

          {!SettingsStore.isMainNet() ? (
            <View>
              <DrawerBorder />
              <DrawerEntryItem
                fontAwesomeIconName={
                  SettingsStore.getApplicationNetwork() ===
                  AsyncStorageHelper.TEST_NET
                    ? 'flask'
                    : 'laptop-code'
                }
              >
                {SettingsStore.getApplicationNetwork()} environment
              </DrawerEntryItem>
              <DrawerBorder />
            </View>
          ) : null}

          <DrawerEntryVersionItem>{this.getVersion()}</DrawerEntryVersionItem>

          <DrawerEntryItem
            bottom
            onPress={() => this.logout()}
            fontAwesomeIconName='user-circle'
          >
            Logout
          </DrawerEntryItem>
        </ScrollView>
      </DrawerContainer>
    )
  }
}

export default AppDrawer
