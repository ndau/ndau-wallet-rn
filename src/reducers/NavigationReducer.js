import * as Actions from '../actions/ActionTypes';

const NavigationReducer = (
  state = {
    userId: '',
    numberOfAccounts: 0,
    qrCode: '',
    encryptionPassword: '',
    entropy: '',
    shuffledMap: {},
    shuffledWords: '',
    seedPhrase: '',
    seedPhraseArray: [],
    password: '',
    navigator: {}
  },
  action = {}
) => {
  switch (action.type) {
    case Actions.PUSH_SCREEN:
      state.navigator.push({
        screen: action.screen,
        label: action.screen
      });
      return { ...state };
    case Actions.PUSH_SETUP_SCREEN:
      state.navigator.push({
        screen: action.screen,
        label: action.screen,
        navigatorStyle: {
          drawUnderTabBar: true,
          tabBarHidden: true,
          topBarElevationShadowEnabled: false,
          disabledBackGesture: true
        },
        backButtonHidden: true
      });
      return { ...state };
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
    case Actions.SET_SEED_PHRASE_ARRAY:
      return { ...state, seedPhraseArray: action.seedPhraseArray };
    case Actions.SET_PASSWORD:
      return { ...state, password: action.password };
    case Actions.SET_NAVIGATOR:
      return { ...state, navigator: action.navigator };
    default:
      return state;
  }
};

export default NavigationReducer;
