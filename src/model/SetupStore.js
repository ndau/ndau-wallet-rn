import { Alert } from 'react-native';

const TESTNET_ADDRESS = 'tn';
const MAINNET_ADDRESS = 'nd';

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
    this._seedPhrase = '';
    this._shuffledMap = [];
    this._shuffledWord = [];
    this._addressType = MAINNET_ADDRESS;

    return SetupStore.instance;
  }

  setUserId(userId) {
    this._userId = userId;
    console.debug(`SetupStore.setUserId ${this._userId}`);
  }

  getUserId() {
    console.debug(`SetupStore.getUserId ${this._userId}`);
    return this._userId;
  }

  setNumberOfAccounts(numberOfAccounts) {
    this._numberOfAccounts = numberOfAccounts;
    console.debug(`SetupStore.setNumberOfAccounts ${this._numberOfAccounts}`);
  }

  getNumberOfAccounts() {
    console.debug(`SetupStore.getNumberOfAccounts ${this._numberOfAccounts}`);
    return this._numberOfAccounts;
  }

  setQRCode(qrCode) {
    this._qrCode = qrCode;
    console.debug(`SetupStore.setQRCode ${this._qrCode}`);
  }

  getQRCode() {
    console.debug(`SetupStore.getQRCode ${this._qrCode}`);
    return this._qrCode;
  }

  setEncryptionPassword(encryptionPassword) {
    this._encryptionPassword = encryptionPassword;
    console.debug(`SetupStore.setEncryptionPassword ${this._encryptionPassword}`);
  }

  getEncryptionPassword() {
    console.debug(`SetupStore.getEncryptionPassword ${this._encryptionPassword}`);
    return this._encryptionPassword;
  }

  setEntropy(entropy) {
    this._entropy = entropy;
    console.debug(`SetupStore.setEntropy ${this._entropy}`);
  }

  getEntropy() {
    console.debug(`SetupStore.getEntropy ${this._entropy}`);
    return this._entropy;
  }

  setSeedPhrase(seedPhrase) {
    this._seedPhrase = seedPhrase.slice();
    console.debug(`SetupStore.setSeedPhrase ${this._seedPhrase}`);
  }

  getSeedPhrase() {
    console.debug(`SetupStore.getSeedPhrase ${this._seedPhrase}`);
    return this._seedPhrase;
  }

  setShuffledWords(shuffledWords) {
    this._shuffledWords = shuffledWords.slice();
    console.debug(`SetupStore.setShuffledWords ${this._shuffledWords}`);
  }

  getShuffledWords() {
    console.debug(`SetupStore.getShuffledWords ${this._shuffledWords}`);
    return this._shuffledWords;
  }

  setShuffledMap(shuffledMap) {
    this._shuffledMap = shuffledMap.slice();
    console.debug(`SetupStore.setShuffledMap ${this._shuffledMap}`);
  }

  getShuffledMap() {
    console.debug(`SetupStore.getShuffledMap ${this._shuffledMap}`);
    return this._shuffledMap;
  }

  toggleAddressType() {
    const oldAddressType = this._addressType;
    const newAddressType =
      this._addressType === MAINNET_ADDRESS ? TESTNET_ADDRESS : MAINNET_ADDRESS;

    Alert.alert(
      'Information',
      `Old address type was ${oldAddressType} which has been moved to ${newAddressType}`,
      [ { text: 'OK', onPress: () => {} } ],
      { cancelable: false }
    );

    this._addressType = newAddressType;
    console.debug(`SetupStore.addressType ${this._addressType}`);
  }

  getAddressType() {
    console.debug(`SetupStore.getAddressType ${this._addressType}`);
    return this._addressType;
  }
}

const instance = new SetupStore();

export default instance;
