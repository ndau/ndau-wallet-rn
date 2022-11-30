/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */
import 'react-native-gesture-handler'; // Note: If you are building for Android or iOS, do not skip this step, or your app may crash in production even if it works fine in development.
import React, {useEffect, useState} from 'react';
import {Modal, Portal, Provider} from 'react-native-paper';
import '@walletconnect/react-native-compat';
import {useSnapshot} from 'valtio';
import {LogBox, View, Text, NativeModules, AppState} from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import FlashMessage from 'react-native-flash-message';
import OfflineMessage from './components/common/OfflineMessage';
import BackgroundTasks from './services/BackgroundTasks';
import Styles from './styles/styles';
import SettingsStore from './stores/SettingsStore';
import ServiceDiscovery from './api/ServiceDiscovery';
import {ThemeProvider} from 'nachos-ui';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NotificationService from './services/NotificationService';
import {createSignClient} from './utils/WalletConnectUtil';
import VotingModal from './components/walletconnect/request_vote_session_modal';
import useInitialization from './hooks/useInitialization';
import FilterByCategoryModel from './components/common/filterByCategory';
import ProposalModal from './components/walletconnect/proposal_session_modal';
import SessionBloc from './blocs/SessionBloc';
import ErrorModal from './components/walletconnect/error_session';
import AppProposalModal from './components/walletconnect/app_proposal_approve_reject';
import FeatureProposalModal from './components/walletconnect/feature_proposal_request_model';
import AdminProposalModal from './components/walletconnect/admin_feature_model';

// TODO theme provider is not used but appears to be required by some sub component.
// Simply removing it causes an error.
configureFontAwesomePro();
LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'Require cycle:',
]);
LogBox.ignoreLogs(['Class RCTCxxModule']);

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

// export default class App extends React.Component {
//   constructor (props) {
//     super(props)

//     BackgroundTasks.initialize()
//     this.state = {
//       net: '',
//       appState: AppState.currentState
//     }
//     const updater = net => {
//       this.setState({ net: net })
//       ServiceDiscovery.invalidateCache()
//     }
//     SettingsStore.addListener(updater)
//   }

//   componentDidMount =async()=> {
//     NotificationService.clearAll()
//     await createSignClient()
//     this.appStateSubscription = AppState.addEventListener('change', this._handleAppStateChange);

//   }

//   componentWillUnmount() {
//     this.appStateSubscription.remove()
//   }

// _handleAppStateChange = async nextAppState => {
//   if (
//     this.state.appState.match(/inactive|background/) &&
//     nextAppState === 'active'
//   ) {
//     NotificationService.clearAll()
//   }
//   this.setState({ appState: nextAppState })
// }

//   render () {
//     configureFontAwesomePro('solid')
// configureFontAwesomePro('light')
//     const { net } = this.state
//     const isNetShown = net !== 'mainnet' && net !== ''
//     return (
//       <View style={{ flex: 1, backgroundColor: 'black' }}>
//         <ThemeProvider>
//           {isNetShown ? (
//             <View style={Styles.networkContainer}>
//               <View style={Styles[`${net}BarStyle`]}>
//                 <Text style={Styles.netBarText}>{net}</Text>
//               </View>
//             </View>
//           ) : null}
//           <SafeAreaProvider>
//             <NavigationContainer>
//               <AppNavigation isNetShown={isNetShown} />
//             </NavigationContainer>
//           </SafeAreaProvider>
//           <FlashMessage position='top' />
//           <OfflineMessage />
//         </ThemeProvider>
//       </View>
//     )
//   }
// }

const App = () => {
  const [netInfo, setnet] = useState('');
  const [appState, setAppstate] = useState(AppState.currentState);
  let {
    proposalModal,
    appProposalModel,
    votingRequestModal,
    alertPopup,
    adminProposalModel,
    adminApprove,
    featureProposalModel,
  } = useSnapshot(SessionBloc.state);

  handleAppStateChange = async nextAppState => {
    console.log('nextAppState', nextAppState);
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      NotificationService.clearAll();
    }
    setAppstate(nextAppState);
  };
  const updater = netInfo => {
    console.log('net...', netInfo);
    setnet(netInfo);
    ServiceDiscovery.invalidateCache();
  };

  useEffect(() => {
    SettingsStore.addListener(updater);
    async function getData() {
      NotificationService.clearAll();
      // await createSignClient();

    }
    getData();
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  configureFontAwesomePro('solid');
  configureFontAwesomePro('light');
  let ready = useInitialization();
  console.log('ready....', ready, netInfo);
  const isNetShown = netInfo !== 'mainnet' && netInfo !== '';
  return (
    <Provider>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ThemeProvider>
          {isNetShown ? (
            <View style={Styles.networkContainer}>
              <View style={Styles[`${netInfo}BarStyle`]}>
                <Text style={Styles.netBarText}>{netInfo}</Text>
              </View>
            </View>
          ) : null}
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigation isNetShown={isNetShown} />
            </NavigationContainer>
          </SafeAreaProvider>
          <FlashMessage position="top" />
          <OfflineMessage />
        </ThemeProvider>
      </View>
      {proposalModal && <ProposalModal />}
      {/* <FilterByCategoryModel/> */}
      {alertPopup && <ErrorModal />}
      {featureProposalModel && <FeatureProposalModal />}
      {appProposalModel && <AppProposalModal />}
      {votingRequestModal && <VotingModal />}
      {adminProposalModel && <AdminProposalModal />}
    </Provider>
  );
};
export default App;
