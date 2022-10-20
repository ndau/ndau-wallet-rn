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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import DashboardNavigation from './DashboardNavigation';
import ContactSupportNavigation from './ContactSupportNavigation';
import SetupWelcome from '../screens/setup/SetupWelcome';
import SetupWalletName from '../screens/setup/SetupWalletName';
import SetupNewOrRecovery from '../screens/setup/SetupNewOrRecovery';
import SetupEncryptionPassword from '../screens/setup/SetupEncryptionPassword';
import SetupConfirmRecoveryPhrase from '../screens/setup/SetupConfirmRecoveryPhrase';
import SetupRecoveryPhrase from '../screens/setup/SetupRecoveryPhrase';
import SetupGetRecoveryPhrase from '../screens/setup/SetupGetRecoveryPhrase';
import SetupTermsOfService from '../screens/setup/SetupTermsOfService';
import SetupYourWallet from '../screens/setup/SetupYourWallet';
import Authentication from '../screens/Authentication';
import AuthLoading from './AuthLoading';
import SettingsNavigation from './SettingsNavigation';
import ContactSupport from '../screens/ContactSupport';
import Explore from '../screens/Explore';
import Block from '../screens/Block';
import Transections from '../screens/Transections';
import DetailBlock from '../screens/DetailBlock';
import DetailTransection from '../screens/DetailTransections';
import Stats from '../screens/stats';
import RichList from '../screens/RichList';
import Statistics from '../screens/Statistics';
import ScanQR from '../screens/ScanQR';
import ExploreStack from './ExplorerNavigation';
import Account from '../screens/Accounts';
import AllTransactions from '../screens/AllTransactions';
import FilterByTypeTransactions from '../screens/FilterByTypeTransactions';
import useInitialization from '../hooks/useInitialization';
import useSignEventHandler from '../hooks/useSignEvents';
import Pairing from '../screens/Pairing';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <AppDrawer {...props} />}
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '75%'},
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="DashboardNav" component={DashboardNavigation} />
      <Drawer.Screen
        name="ContactSupportNav"
        component={ContactSupportNavigation}
      />
      <Drawer.Screen name="SettingsNav" component={SettingsNavigation} />
      <Drawer.Screen name="ExploreNav" component={ExploreStack} />
      <Drawer.Screen name="PairingNav" component={Pairing} />
    </Drawer.Navigator>
  );
};

const SetupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SetupWelcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SetupWelcome" component={SetupWelcome} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="DetailBlock" component={DetailBlock} />
      <Stack.Screen name="SetupWalletName" component={SetupWalletName} />
      <Stack.Screen name="SetupNewOrRecovery" component={SetupNewOrRecovery} />
      <Stack.Screen
        name="SetupEncryptionPassword"
        component={SetupEncryptionPassword}
      />
      <Stack.Screen
        name="SetupConfirmRecoveryPhrase"
        component={SetupConfirmRecoveryPhrase}
      />
      <Stack.Screen
        name="SetupRecoveryPhrase"
        component={SetupRecoveryPhrase}
      />
      <Stack.Screen
        name="SetupGetRecoveryPhrase"
        component={SetupGetRecoveryPhrase}
      />
      <Stack.Screen
        name="SetupTermsOfService"
        component={SetupTermsOfService}
      />
      <Stack.Screen name="SetupYourWallet" component={SetupYourWallet} />
    </Stack.Navigator>
  );
};

const AppContainer = props => {
  useSignEventHandler();

  return (
    <Stack.Navigator
      initialRouteName="SetupStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="Authentication">
        {nestedProps => (
          <Authentication {...nestedProps} isNetShown={props.isNetShown} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Blockchain Explorer" component={Explore} />
      <Stack.Screen name="Transection" component={Transections} />
      <Stack.Screen name="Block" component={Block} />
      <Stack.Screen name="DetailBlock" component={DetailBlock} />
      <Stack.Screen name="ContactSupport" component={ContactSupport} />
      <Stack.Screen name="Setup" component={SetupStack} />

      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      <Stack.Screen name="DetailTransection" component={DetailTransection} />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="Pairing" component={Pairing} />

      <Stack.Screen name="stats" component={Stats} />
      <Stack.Screen name="RichList" component={RichList} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="AllTransations" component={AllTransactions} />
      <Stack.Screen
        name="FilterByTypeTransactions"
        component={FilterByTypeTransactions}
      />
    </Stack.Navigator>
  );
};

export default AppContainer;
