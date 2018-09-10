import * as Actions from './ActionTypes';

export const setUserId = (userId) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_USERID, userId });
  };
};

export const setNumberOfAccounts = (numberOfAccounts) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_NUMBER_OF_ACCOUNTS, numberOfAccounts });
  };
};

export const setQRCode = (qrCode) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_QRCODE, qrCode });
  };
};

export const setEncryptionPassword = (encryptionPassword) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_ENCRYPTION_PASSWORD, encryptionPassword });
  };
};

export const setEntropy = (entropy) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_ENTROPY, entropy });
  };
};

export const setSeedPhrase = (seedPhrase) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_SEED_PHRASE, seedPhrase });
  };
};

export const setShuffledWords = (shuffledWords) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_SHUFFLED_WORDS, shuffledWords });
  };
};

export const setShuffledMap = (shuffledMap) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_SHUFFLED_MAP, shuffledMap });
  };
};

export const setPassword = (password) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_PASSWORD, password });
  };
};

export const setUser = (user) => {
  return function(dispatch) {
    dispatch({ type: Actions.SET_USER, user });
  };
};

export const toggleTestNet = () => {
  return function(dispatch) {
    dispatch({ type: Actions.TOGGLE_TESTNET });
  };
};
