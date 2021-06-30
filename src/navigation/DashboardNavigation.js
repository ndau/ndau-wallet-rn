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
import Dashboard from '../screens/Dashboard'
import AppDrawer from './AppDrawer'

const DashboardScreen = ({ navigation }) => (
  <Dashboard navigation={navigation} />
)
DashboardScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardScreen }
})

const DashboardNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack
    }
  },
  {
    contentComponent: AppDrawer
  }
)

export default DashboardNavigation
