/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AsyncStorage from '@react-native-community/async-storage'
import CryptoJS from 'crypto-js'
import EntropyHelper from '../helpers/EntropyHelper'
import LogStore from '../stores/LogStore'

// we put these things on either end of the combination to make sure we know that we
// have decrypted it properly
const PREFIX = 'Prefix@'
const SUFFIX = '@Suffix'

const MULTISAFE_PREFIX = 'MultiSafe_'
const MULTISAFE_DATA_PREFIX = MULTISAFE_PREFIX + 'Data_'
const MULTISAFE_META_PREFIX = MULTISAFE_PREFIX + 'Meta_'

const PASSWORD_INDEX = 'PasswordIndex'

class MultiSafe {
  // a MultiSafe is created with the constructor but may not be used until it
  // is initialized with create(), which is an async function because of
  // AsyncStorage.
  constructor () {
    this.storageKey = ''
  }

  // _encrypt symmetrically encrypts plaintext with pw
  _encrypt = (plain, pw) => {
    let value = PREFIX + plain + SUFFIX
    let encrypted = CryptoJS.AES.encrypt(value, pw)
    let r = encrypted.toString()
    return r
  }

  // _decrypt symmetrically decrypts plaintext from a coded value;
  // it returns either a decrypted string or null if the pw was wrong.
  _decrypt = (coded, pw) => {
    // let coded = CryptoJS.enc.Base64.parse(hexcoded);
    let decrypted = CryptoJS.AES.decrypt(coded, pw)
    // if the password was wrong, it may not even convert to a string; test for that
    try {
      decrypted = decrypted.toString(CryptoJS.enc.Utf8)
    } catch (err) {
      return null
    }

    // but even if it converted to a string, we still might not have decoded it properly
    // so verify that
    if (
      decrypted.slice(0, PREFIX.length) !== PREFIX ||
      decrypted.slice(-SUFFIX.length) !== SUFFIX
    ) {
      return null
    }
    // we're good, strip off the ends
    return decrypted.slice(PREFIX.length, -SUFFIX.length)
  }

  _getMultisafeKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const newKeys = keys.filter(
        key => key.slice(0, MULTISAFE_PREFIX.length) == MULTISAFE_PREFIX
      )
      return newKeys
    } catch (error) {
      LogStore.log('GetAllKeys failed', error)
      return []
    }
  }

  _keyExists = async key => {
    const keys = await this._getMultisafeKeys()
    return keys.includes(key)
  }

  // _storeString stores a string in AsyncStorage
  _storeString = async (key, value) => {
    await AsyncStorage.setItem(key, value)
  }

  // _storeObject stores an object in AsyncStorage by
  // converting it to a JSON string.
  _storeObject = async (key, obj) => {
    let value = JSON.stringify(obj)
    return this._storeString(key, value)
  }

  // _storeEncryptedObject stores an object in AsyncStorage by
  // first converting it to a JSON string, then encrypting that
  // string with the public encryptionKey.
  _storeEncryptedObject = async (key, obj, pw) => {
    let privkey = await this._getDataSecret(pw)
    let value = JSON.stringify(obj)
    let encvalue = this._encrypt(value, privkey)
    return this._storeString(key, encvalue)
  }

  // _retrieveString retrieves a string from AsyncStorage
  _retrieveString = async key => {
    try {
      let item = await AsyncStorage.getItem(key)
      return item
    } catch (err) {
      throw err
    }
  }

  // _retrieveObject retrieves a json-encoded object from AsyncStorage
  _retrieveObject = async key => {
    let data = await this._retrieveString(key)
    return JSON.parse(data)
  }

  // _retrieveEncryptedObject retrieves a JSON-encoded encrypted object from AsyncStorage by
  // trying to use the provided pw to unlock it.
  _retrieveEncryptedObject = async (key, pw) => {
    let privkey = await this._getDataSecret(pw)
    let data = await this._retrieveString(key)
    let decrypted = this._decrypt(data, privkey)
    if (decrypted === null) {
      throw Error('unable to decode ' + key)
    }

    return JSON.parse(decrypted)
  }

  // _getDataSecret returns a promise for the private key to unlock the encoded data,
  // given a password. It tries the password against all of the combinations
  // until it finds a match or fails.
  _getDataSecret = async pw => {
    let metaKey = MULTISAFE_META_PREFIX + this.storageKey
    let meta = await this._retrieveObject(metaKey)
    if (!meta) {
      throw Error('no object was stored under ' + MULTISAFE_META_PREFIX)
    }
    for (let combo of meta.combinations) {
      const decrypted = this._decrypt(combo, pw)
      if (decrypted !== null) {
        return decrypted
      }
    }
    throw Error('Bad recovery phrase. Please check your phrase and try again')
  }

  // create(storagekey, combo) is the way to initialize a MultiSafe. It takes as
  // arguments:
  //
  // * A storage key (the word key here is used as in key - value pair) to use with
  // AsyncStorage, where the corresponding value will be the encrypted data blob.
  // (This is effectively the ID of the MultiSafe — if we have multiple safes
  // we’ll use different keys.)
  // * combo is the first combination to be used.
  //
  // It returns a Promise with the following properties:
  //
  // StorageKey: the storage key above
  // EncryptionKey: the public half of the keypair, used to encrypt the async blob
  // Combinations[]: an array of encryptions of DecryptionKey, which is the private
  // half of the keypair.
  // After this method is called, there will be one entry in this array, which is the
  // decryption key symetrically encrypted with combo.
  create = async (storageKey, combo) => {
    this.storageKey = storageKey
    let multisafeKey = MULTISAFE_DATA_PREFIX + storageKey
    let metaKey = MULTISAFE_META_PREFIX + storageKey
    if (await this._keyExists(metaKey)) {
      await this.verify(combo)
      return this
    }
    // ok, it didn't exist, so we need a new one
    // build a random encryption secret
    let dataSecret = await EntropyHelper.generateEntropy()
    let combination0 = this._encrypt(dataSecret, combo)
    // when building a new one we assume the password/combo
    // will be at index 0
    await this._storeString(PASSWORD_INDEX, '0')
    let meta = {
      combinations: [combination0]
    }
    await this._storeObject(metaKey, meta)
    const data = {}
    await this._storeEncryptedObject(multisafeKey, data, combo)
    return this
  }

  // Verify(combo string): Promise(bool)
  // combo is any one of the combinations that can unlock the MultiSafe.
  // This function simply validates that the provided combination is valid.
  verify = async combo => {
    let secret = await this._getDataSecret(combo)
    return secret !== null
  }

  // Store(data: object, combo: string): Promise(void)
  // data is the object that should be stored in the safe.
  // It will REPLACE any previously stored data.
  // combo is one of the valid combinations
  // Store uses the EncryptionKey to encrypt the data object passed in.
  // It stores the resulting encrypted blob in AsyncStorage under the storageKey.
  // It returns a void Promise or fails.
  store = async (data, combo) => {
    let multisafeKey = MULTISAFE_DATA_PREFIX + this.storageKey
    return this._storeEncryptedObject(multisafeKey, data, combo)
  }

  /**
   * This function will first call `overwritePassword` with the
   * same parameters passed to it. Then, we remove the item in
   * the combinations that is at `passwordIndex`. You can safely
   * assume that we have removed the first password. Then we
   * reset `passwordIndex` to the combination that was just added,
   * which we can assume is the new password.
   *
   * @param {string} newcombo new combination/password to overwrite
   * @param {string} oldcombo the old combination/password used to
   * create a new password
   * @returns an promise to the `_storeObject` function
   */
  overwritePassword = async (newcombo, oldcombo) => {
    await this.addCombination(newcombo, oldcombo)

    let metaKey = MULTISAFE_META_PREFIX + this.storageKey
    let metadata = await this._retrieveObject(metaKey)
    let passwordIndex = parseInt(await this._retrieveString(PASSWORD_INDEX))
    metadata.combinations.splice(passwordIndex, 1)
    passwordIndex = metadata.combinations.length - 1
    await this._storeString(PASSWORD_INDEX, passwordIndex.toString())
    return this._storeObject(metaKey, metadata)
  }

  // AddCombination(newcombo: string, oldcombo: string): Promise(void)
  // Assuming that oldcombo is valid, this re-encrypts the private key decoded with oldcombo
  // with the newcombo and adds that to the stored list of combinations.
  // Returns a void Promise if it succeeds.
  addCombination = async (newcombo, oldcombo) => {
    let metaKey = MULTISAFE_META_PREFIX + this.storageKey
    let metadata = await this._retrieveObject(metaKey)
    let secret = await this._getDataSecret(oldcombo)
    let combo = this._encrypt(secret, newcombo)
    metadata.combinations.push(combo)
    return this._storeObject(metaKey, metadata)
  }

  // Retrieve(combo: string): Promise(object)
  // Given a valid combination, this returns a Promise containing the decrypted
  // object that was last stored.
  retrieve = async combo => {
    let multisafeKey = MULTISAFE_DATA_PREFIX + this.storageKey
    return this._retrieveEncryptedObject(multisafeKey, combo)
  }

  /**
   * Send an array of all storage keys present within AsyncStorage
   * @returns sends back an array of new
   */
  getStorageKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const newKeys = keys
        .filter(key => key.indexOf(MULTISAFE_DATA_PREFIX) !== -1)
        .map(key => {
          if (key.indexOf(MULTISAFE_DATA_PREFIX) !== -1) {
            return key.substring(MULTISAFE_DATA_PREFIX.length, key.length)
          }
        })
      return newKeys
    } catch (error) {
      return []
    }
  }

  /**
   * Does a MultiSafe already exist for the passed in
   * storageKey combo. If it does we get a true back,
   * otherwise false
   *
   * @param {string} storageKey to check
   * @param {string} combo combination or password to check
   * @returns true if present else false
   */
  doesMultiSafeExist = async (storageKey, combo) => {
    this.storageKey = storageKey
    let multisafeKey = MULTISAFE_DATA_PREFIX + storageKey
    let metaKey = MULTISAFE_META_PREFIX + storageKey
    if (await this._keyExists(metaKey)) {
      try {
        await this.verify(combo)
      } catch (error) {
        return false
      }
      return true
    }

    return false
  }

  /**
   * Is a MultiSafe present within the AsyncStorage keys.
   * @returns {boolean} true if present, false if not
   */
  static isAMultiSafePresent = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      for (let key of keys) {
        if (
          key.substring(0, MULTISAFE_META_PREFIX.length) ===
          MULTISAFE_META_PREFIX
        ) {
          return true
        }
      }
    } catch (error) {}

    return false
  }
}

export default MultiSafe
