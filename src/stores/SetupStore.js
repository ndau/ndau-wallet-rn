import { Alert } from 'react-native'
import AppConstants from '../AppConstants'
import LogStore from '../stores/LogStore'

class SetupStore {
  constructor () {
    if (!SetupStore.instance) {
      SetupStore.instance = this
    }

    this._userId = ''
    // Default to 1 account created
    this._numberOfAccounts = 1
    this._qrCode = ''
    this._encryptionPassword = ''
    this._entropy = ''
    this._recoveryPhrase = ''
    this._shuffledMap = []
    this._shuffledWord = []
    this._addressType = AppConstants.MAINNET_ADDRESS
    this._walletId = ''
  }

  set userId (userId) {
    this._userId = userId
  }

  get userId () {
    LogStore.log(`SetupStore.userId ${this._userId}`)
    return this._userId
  }

  set numberOfAccounts (numberOfAccounts) {
    this._numberOfAccounts = numberOfAccounts
  }

  get numberOfAccounts () {
    LogStore.log(`SetupStore.numberOfAccounts ${this._numberOfAccounts}`)
    return this._numberOfAccounts
  }

  set qrCode (qrCode) {
    this._qrCode = qrCode
  }

  get qrCode () {
    LogStore.log(`SetupStore.qrCode ${this._qrCode}`)
    return this._qrCode
  }

  set encryptionPassword (encryptionPassword) {
    this._encryptionPassword = encryptionPassword
  }

  get encryptionPassword () {
    LogStore.log(`SetupStore.encryptionPassword ${this._encryptionPassword}`)
    return this._encryptionPassword
  }

  set entropy (entropy) {
    this._entropy = entropy
  }

  get entropy () {
    LogStore.log(`SetupStore.entropy ${this._entropy}`)
    return this._entropy
  }

  set recoveryPhrase (recoveryPhrase) {
    this._recoveryPhrase = recoveryPhrase.slice()
  }

  get recoveryPhrase () {
    LogStore.log(`SetupStore.recoveryPhrase ${this._recoveryPhrase}`)
    return this._recoveryPhrase
  }

  set shuffledWords (shuffledWords) {
    this._shuffledWords = shuffledWords.slice()
  }

  get shuffledWords () {
    LogStore.log(`SetupStore.shuffledWords ${this._shuffledWords}`)
    return this._shuffledWords
  }

  set shuffledMap (shuffledMap) {
    this._shuffledMap = shuffledMap.slice()
  }

  get shuffledMap () {
    LogStore.log(`SetupStore.shuffledMap ${this._shuffledMap}`)
    return this._shuffledMap
  }

  toggleAddressType () {
    const oldAddressType = this._addressType
    const newAddressType =
      this._addressType === AppConstants.MAINNET_ADDRESS
        ? AppConstants.TESTNET_ADDRESS
        : AppConstants.MAINNET_ADDRESS

    Alert.alert(
      'Information',
      `Old address type was ${oldAddressType} which has been moved to ${newAddressType}`,
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    )

    this._addressType = newAddressType
  }

  get addressType () {
    LogStore.log(`SetupStore.addressType ${this._addressType}`)
    return this._addressType
  }

  set walletId (walletId) {
    this._walletId = walletId
  }

  get walletId () {
    LogStore.log(`SetupStore.walletId ${this._walletId}`)
    return this._walletId
  }

  printData = () => {
    LogStore.log(`SetupStore.userId ${this._userId}`)
    LogStore.log(`SetupStore.numberOfAccounts ${this._numberOfAccounts}`)
    LogStore.log(`SetupStore.qrCode ${this._qrCode}`)
    LogStore.log(`SetupStore.entropy ${this._entropy}`)
    LogStore.log(`SetupStore.walletId ${this._walletId}`)
    LogStore.log(`SetupStore.addressType ${this._addressType}`)
  }

  reset = () => {
    this._userId = ''
    this._numberOfAccounts = 0
    this._qrCode = ''
    this._encryptionPassword = ''
    this._entropy = ''
    this._recoveryPhrase = ''
    this._shuffledMap = []
    this._shuffledWord = []
    this._addressType = AppConstants.MAINNET_ADDRESS
    this._walletId = ''
  }
}

const instance = new SetupStore()

export default instance
