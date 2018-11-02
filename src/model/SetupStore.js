import { Alert } from 'react-native';
import AppConstants from '../AppConstants';

class SetupStore {
  constructor() {
    if (!SetupStore.instance) {
      SetupStore.instance = this;
    }

    this._userId = '';
    this._numberOfAccounts = 0;
    this._qrCode = '';
    this._encryptionPassword = '';
    this._entropy = '';
    this._recoveryPhrase = '';
    this._shuffledMap = [];
    this._shuffledWord = [];
    this._addressType = AppConstants.MAINNET_ADDRESS;
    this._walletId = '';
  }

  set userId(userId) {
    this._userId = userId;
  }

  get userId() {
    console.debug(`SetupStore.userId ${this._userId}`);
    return this._userId;
  }

  set numberOfAccounts(numberOfAccounts) {
    this._numberOfAccounts = numberOfAccounts;
  }

  get numberOfAccounts() {
    console.debug(`SetupStore.numberOfAccounts ${this._numberOfAccounts}`);
    return this._numberOfAccounts;
  }

  set qrCode(qrCode) {
    this._qrCode = qrCode;
  }

  get qrCode() {
    console.debug(`SetupStore.qrCode ${this._qrCode}`);
    return this._qrCode;
  }

  set encryptionPassword(encryptionPassword) {
    this._encryptionPassword = encryptionPassword;
  }

  get encryptionPassword() {
    console.debug(`SetupStore.encryptionPassword ${this._encryptionPassword}`);
    return this._encryptionPassword;
  }

  set entropy(entropy) {
    this._entropy = entropy;
  }

  get entropy() {
    console.debug(`SetupStore.entropy ${this._entropy}`);
    return this._entropy;
  }

  set recoveryPhrase(recoveryPhrase) {
    this._recoveryPhrase = recoveryPhrase.slice();
  }

  get recoveryPhrase() {
    console.debug(`SetupStore.recoveryPhrase ${this._recoveryPhrase}`);
    return this._recoveryPhrase;
  }

  set shuffledWords(shuffledWords) {
    this._shuffledWords = shuffledWords.slice();
  }

  get shuffledWords() {
    console.debug(`SetupStore.shuffledWords ${this._shuffledWords}`);
    return this._shuffledWords;
  }

  set shuffledMap(shuffledMap) {
    this._shuffledMap = shuffledMap.slice();
  }

  get shuffledMap() {
    console.debug(`SetupStore.shuffledMap ${this._shuffledMap}`);
    return this._shuffledMap;
  }

  toggleAddressType() {
    const oldAddressType = this._addressType;
    const newAddressType =
      this._addressType === AppConstants.MAINNET_ADDRESS
        ? AppConstants.TESTNET_ADDRESS
        : AppConstants.MAINNET_ADDRESS;

    Alert.alert(
      'Information',
      `Old address type was ${oldAddressType} which has been moved to ${newAddressType}`,
      [ { text: 'OK', onPress: () => {} } ],
      { cancelable: false }
    );

    this._addressType = newAddressType;
  }

  get addressType() {
    console.debug(`SetupStore.addressType ${this._addressType}`);
    return this._addressType;
  }

  set walletId(walletId) {
    this._walletId = walletId;
  }

  get walletId() {
    console.debug(`SetupStore.walletId ${this._walletId}`);
    return this._walletId;
  }

  printData = () => {
    console.debug(`SetupStore.userId ${this._userId}`);
    console.debug(`SetupStore.numberOfAccounts ${this._numberOfAccounts}`);
    console.debug(`SetupStore.qrCode ${this._qrCode}`);
    console.debug(`SetupStore.entropy ${this._entropy}`);
    console.debug(`SetupStore.recoveryPhrase ${this._recoveryPhrase}`);
    console.debug(`SetupStore.shuffledWords ${this._shuffledWords}`);
    console.debug(`SetupStore.shuffledMap ${this._shuffledMap}`);
    console.debug(`SetupStore.walletId ${this._walletId}`);
    console.debug(`SetupStore.addressType ${this._addressType}`);
  };
}

const instance = new SetupStore();

export default instance;
