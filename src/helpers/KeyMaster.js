/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import Key from '../model/Key'
import Account from '../model/Account'
import { NativeModules } from 'react-native'
import AppConstants from '../AppConstants'
import FlashNotification from '../components/common/FlashNotification'
import Wallet from '../model/Wallet'
import DataFormatHelper from './DataFormatHelper'
import KeyPathHelper from './KeyPathHelper'

/**
 * This function will return an array of addresses that can be
 * used to check the blockchain. Please keep in mind that this method
 * is only for the existence.
 *
 * @deprecated since version 1.8 - this should ONLY be used by the code
 * that is checking fot the older existence of keys
 * @returns {Object} of address:path (ex. {'abcd123':"/44'/20036'/100/1"})
 * @param {string} rootPrivateKey string of bytes
 * @param {number} startIndex what index in the derivation path to
 * start searching for addresses
 * @param {number} endIndex what index in the derivation path to
 * end the search for an addresses
 */
const getRootAddresses = async (rootPrivateKey, startIndex, endIndex) => {
  if (!rootPrivateKey) {
    throw new Error('you MUST pass rootPrivateKey')
  }
  const addresses = []

  try {
    for (let i = startIndex; i <= endIndex; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        `/${i}`
      )

      const address = await NativeModules.KeyaddrManager.ndauAddress(derivedKey)

      if (address) {
        addresses[address] = `/${i}`
      }
    }
  } catch (error) {
    FlashNotification.showError(
      `problem encountered creating root addresses: ${error.message}`
    )
    throw error
  }

  return addresses
}

/**
 * This function will return the addresses from the BIP44 compliant
 * path we use for the accountCreationKey. This is used in recovery to check
 * for the existence of an address on the blockchain.
 *
 * @returns {Object} of address:path (ex. {'abcd123':"/44'/20036'/100/1"})
 * @param {string} rootPrivateKey string of bytes
 * @param {number} startIndex what index in the derivation path to
 * start searching for addresses
 * @param {number} endIndex what index in the derivation path to
 * end the search for an addresses
 */
const getBIP44Addresses = async (rootPrivateKey, startIndex, endIndex) => {
  if (!rootPrivateKey) {
    throw new Error('you MUST pass rootPrivateKey')
  }
  const addresses = {}

  try {
    for (let i = startIndex; i <= endIndex; i++) {
      const derivedKey = await NativeModules.KeyaddrManager.deriveFrom(
        rootPrivateKey,
        '/',
        KeyPathHelper.accountCreationKeyPath() + `/${i}`
      )

      const address = await NativeModules.KeyaddrManager.ndauAddress(derivedKey)

      if (address) {
        addresses[address] = KeyPathHelper.accountCreationKeyPath() + `/${i}`
      }
    }
  } catch (error) {
    FlashNotification.showError(
      `problem encountered creating BIP44 addresses: ${error.message}`
    )
    throw error
  }

  return addresses
}

const getWalletFromUser = (user, walletId) => {
  return user.wallets[DataFormatHelper.create8CharHash(walletId)]
}

const getAccountFromWallet = (wallet, accountAddress) => {
  return wallet.accounts[accountAddress]
}

const setWalletInUser = (user, wallet) => {
  return (user.wallets[
    DataFormatHelper.create8CharHash(wallet.walletId)
  ] = wallet)
}

/**
 * Given the wallet and the key hash, this function will pass back
 * the string representation of the public key found.
 *
 * @param {Wallet} wallet
 * @param {string} hashForKey
 */
const getPublicKeyFromHash = (wallet, hashForKey) => {
  return wallet.keys[hashForKey].publicKey
}

/**
 * Given the wallet and the key hash, this function will pass back
 * the string representation of the private key found.
 *
 * @param {Wallet} wallet
 * @param {string} hashForKey
 */
const getPrivateKeyFromHash = (wallet, hashForKey) => {
  return wallet.keys[hashForKey].privateKey
}

const createKey = (privateKey, publicKey, path) => {
  const newKey = new Key()
  if (privateKey) newKey.privateKey = privateKey
  if (publicKey) newKey.publicKey = publicKey
  newKey.derivedFromRoot = AppConstants.DERIVED_ROOT_YES
  newKey.path = path
  return newKey.toJSON()
}

/**
 * This method will create an account from the path and data
 * sent in. This method will support the use of the root private
 * key as well. This is to support generation of some initial wallets
 * at root.
 *
 * @param {Wallet} wallet Wallet where account is added
 * @param {string} derivedPath path to be created
 * @param {string} addressData data to add to the account
 * @param {string} rootPrivateKey If present we use this key and assume it is root
 */
const createAccountFromPath = async (
  wallet,
  derivedPath,
  addressData,
  rootPrivateKey
) => {
  if (!wallet || !derivedPath) {
    throw new Error('You must pass in wallet and derivedPath')
  }
  const account = new Account()

  let privateDerivedKey
  if (rootPrivateKey) {
    // So we must take the derivedPath into consideration and here.
    // The assumption is that this private key passed in is at root
    privateDerivedKey = await NativeModules.KeyaddrManager.deriveFrom(
      rootPrivateKey,
      '/',
      derivedPath
    )
  } else {
    privateDerivedKey = await NativeModules.KeyaddrManager.deriveFrom(
      wallet.keys[wallet.accountCreationKeyHash].privateKey,
      wallet.keys[wallet.accountCreationKeyHash].path,
      derivedPath
    )
  }

  const privateKeyHash = DataFormatHelper.create8CharHash(privateDerivedKey)
  account.ownershipKey = privateKeyHash

  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateDerivedKey
  )

  const newKey = createKey(privateDerivedKey, publicKey, derivedPath)
  wallet.keys[privateKeyHash] = newKey

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey)
  account.address = address

  if (addressData) {
    account.addressData = addressData
  }

  wallet.accounts[address] = account
}

export default {
  getRootAddresses,
  getBIP44Addresses,
  getPublicKeyFromHash,
  getPrivateKeyFromHash,
  getWalletFromUser,
  setWalletInUser,
  createAccountFromPath,
  getAccountFromWallet,
  createKey
}
