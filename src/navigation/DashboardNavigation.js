/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import WalletOverview from '../screens/WalletOverview';
import AccountDetails from '../screens/account/AccountDetails';
import AccountLock from '../screens/account/AccountLock';
import AccountLockType from '../screens/account/AccountLockType';
import AccountLockChooseAccount from '../screens/account/AccountLockChooseAccount';
import AccountLockConfirmation from '../screens/account/AccountLockConfirmation';
import AccountUnlock from '../screens/account/AccountUnlock';
import AccountSend from '../screens/account/AccountSend';
import AccountSendConfirmation from '../screens/account/AccountSendConfirmation';
import AccountReceive from '../screens/account/AccountReceive';
import AccountSetEAIType from '../screens/account/AccountSetEAIType';
import AccountSetEAIChooseAccount from '../screens/account/AccountSetEAIChooseAccount';
import AccountSetEAIConfirmation from '../screens/account/AccountSetEAIConfirmation';
import AccountHistory from '../screens/account/AccountHistory';
// import useSignEventHandler from '../hooks/useSignEvents'

const Stack = createNativeStackNavigator();
const DashboardStack = () => {
  // useSignEventHandler()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="WalletOverview" component={WalletOverview} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AccountLock" component={AccountLock} />
      <Stack.Screen name="AccountLockType" component={AccountLockType} />
      <Stack.Screen
        name="AccountLockChooseAccount"
        component={AccountLockChooseAccount}
      />
      <Stack.Screen
        name="AccountLockConfirmation"
        component={AccountLockConfirmation}
      />
      <Stack.Screen name="AccountUnlock" component={AccountUnlock} />
      <Stack.Screen name="AccountSend" component={AccountSend} />
      <Stack.Screen
        name="AccountSendConfirmation"
        component={AccountSendConfirmation}
      />
      <Stack.Screen name="AccountReceive" component={AccountReceive} />
      <Stack.Screen name="AccountSetEAIType" component={AccountSetEAIType} />
      <Stack.Screen
        name="AccountSetEAIChooseAccount"
        component={AccountSetEAIChooseAccount}
      />
      <Stack.Screen
        name="AccountSetEAIConfirmation"
        component={AccountSetEAIConfirmation}
      />
      <Stack.Screen name="AccountHistory" component={AccountHistory} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
