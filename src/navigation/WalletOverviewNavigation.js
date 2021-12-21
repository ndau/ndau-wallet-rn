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
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WalletOverview from '../screens/WalletOverview'
import AccountDetails from '../screens/account/AccountDetails'
import AccountLock from '../screens/account/AccountLock'
import AccountLockType from '../screens/account/AccountLockType'
import AccountLockChooseAccount from '../screens/account/AccountLockChooseAccount'
import AccountUnlock from '../screens/account/AccountUnlock'
import AccountSend from '../screens/account/AccountSend'
import AccountReceive from '../screens/account/AccountReceive'
import AccountSendConfirmation from '../screens/account/AccountSendConfirmation'
import AccountHistory from '../screens/account/AccountHistory'
import AccountLockConfirmation from '../screens/account/AccountLockConfirmation'

const Stack = createNativeStackNavigator()
const WalletOverviewStack = ()  => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WalletOverview' component={WalletOverview} />
      <Stack.Screen name='AccountDetails' component={AccountDetails} />
      <Stack.Screen name='AccountLock' component={AccountLock} />
      <Stack.Screen name='AccountLockType' component={AccountLockType} />
      <Stack.Screen name='AccountLockChooseAccount' component={AccountLockChooseAccount} />
      <Stack.Screen name='AccountUnlock' component={AccountUnlock} />
      <Stack.Screen name='AccountSend' component={AccountSend} />
      <Stack.Screen name='AccountReceive' component={AccountReceive} />
      <Stack.Screen name='AccountSendConfirmation' component={AccountSendConfirmation} />
      <Stack.Screen name='AccountHistory' component={AccountHistory} />
      <Stack.Screen name='AccountLockConfirmation' component={AccountLockConfirmation} />
    </Stack.Navigator>
  )
}

export default WalletOverviewStack
