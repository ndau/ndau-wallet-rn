import * as Actions from '../actions/ActionTypes';
import { Navigation } from 'react-native-navigation';
import { Platform, Alert } from 'react-native';

const TESTNET_ADDRESS = 'tn';
const MAINNET_ADDRESS = 'nd';

const NavigationReducer = (
  state = {
    userId: '',
    numberOfAccounts: 0,
    qrCode: '',
    encryptionPassword: '',
    entropy: '',
    shuffledMap: [],
    shuffledWords: [],
    seedPhrase: '',
    password: '',
    user: {},
    addressType: MAINNET_ADDRESS
  },
  action = {}
) => {
  switch (action.type) {
    case Actions.PUSH_SCREEN:
      if (Platform.OS === 'android') {
        action.navigator.push({
          screen: action.screen,
          label: action.screen,
          passProps: { ...state },
          navigatorStyle: {
            topBarElevationShadowEnabled: false,
            disabledBackGesture: true
          },
          backButtonHidden: true
        });
      } else {
        action.navigator.showModal({
          screen: action.screen,
          label: action.screen,
          passProps: { ...state },
          navigatorStyle: {
            topBarElevationShadowEnabled: false,
            disabledBackGesture: true
          },
          backButtonHidden: true
        });
      }
      return { ...state };
    case Actions.PUSH_SETUP_SCREEN:
      if (Platform.OS === 'android') {
        action.navigator.push({
          screen: action.screen,
          label: action.screen,
          passProps: { ...state },
          navigatorStyle: {
            drawUnderTabBar: true,
            tabBarHidden: true,
            topBarElevationShadowEnabled: false,
            disabledBackGesture: true
          },
          backButtonHidden: true
        });
      } else {
        action.navigator.showModal({
          screen: action.screen,
          label: action.screen,
          passProps: { ...state },
          navigatorStyle: {
            drawUnderTabBar: true,
            tabBarHidden: true,
            topBarElevationShadowEnabled: false,
            disabledBackGesture: true
          },
          backButtonHidden: true
        });
      }
      return { ...state };
    case Actions.START_TAB_BASED_APP:
      const constants = require('../app-constants');
      const { tabs, animationType, tabsStyle, appStyle } = constants;

      // this will start our app
      if (Platform.OS === 'android') {
        Navigation.startTabBasedApp({
          tabs,
          animationType,
          tabsStyle,
          appStyle,
          passProps: { ...state }
        });
      } else {
        Navigation.startTabBasedApp({
          tabs,
          animationType,
          tabsStyle,
          passProps: { ...state }
        });
      }
      return { ...state };
    case Actions.TOGGLE_TESTNET:
      const oldAddressType = state.addressType;
      const newAddressType =
        state.addressType === MAINNET_ADDRESS ? TESTNET_ADDRESS : MAINNET_ADDRESS;
      const returnObject = {
        ...state,
        addressType: newAddressType
      };

      Alert.alert(
        'Information',
        `Old address type was ${oldAddressType} which has been moved to ${newAddressType}`,
        [ { text: 'OK', onPress: () => {} } ],
        { cancelable: false }
      );

      return returnObject;
    case Actions.SET_USERID:
      return { ...state, userId: action.userId };
    case Actions.SET_NUMBER_OF_ACCOUNTS:
      return { ...state, numberOfAccounts: action.numberOfAccounts };
    case Actions.SET_QRCODE:
      return { ...state, qrCode: action.qrCode };
    case Actions.SET_ENCRYPTION_PASSWORD:
      return { ...state, encryptionPassword: action.encryptionPassword };
    case Actions.SET_ENTROPY:
      return { ...state, entropy: action.entropy };
    case Actions.SET_SHUFFLED_WORDS:
      return { ...state, shuffledWords: action.shuffledWords };
    case Actions.SET_SHUFFLED_MAP:
      return { ...state, shuffledMap: action.shuffledMap };
    case Actions.SET_SEED_PHRASE:
      return { ...state, seedPhrase: action.seedPhrase };
    case Actions.SET_PASSWORD:
      return { ...state, password: action.password };
    case Actions.SET_USER:
      return { ...state, user: action.user };
    default:
      return { ...state };
  }
};

export default NavigationReducer;
