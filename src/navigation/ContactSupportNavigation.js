/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
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
