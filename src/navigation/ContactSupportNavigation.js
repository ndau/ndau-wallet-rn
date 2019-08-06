import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import ContactSupport from '../screens/ContactSupport'
import AppDrawer from './AppDrawer'

const ContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
)
ContactSupportScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const ContactSupportStack = createStackNavigator({
  ContactSupport: { screen: ContactSupportScreen }
})

const ContactSupportNavigation = createDrawerNavigator(
  {
    ContactSupport: {
      path: '/contact-support',
      screen: ContactSupportStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default ContactSupportNavigation
