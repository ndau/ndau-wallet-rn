/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import UserStore from '../stores/UserStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import KeyMaster from '../helpers/KeyMaster'
import AccountAPIHelper from './AccountAPIHelper'
import AppConstants from '../AppConstants'
import { NativeModules } from 'react-native'
import DataFormatHelper from './DataFormatHelper'
import KeyPathHelper from './KeyPathHelper'
import Account from '../model/Account'
import Wallet from '../model/Wallet'

const createAccounts = async (wallet, numberOfAccounts = 1) => {
  const password = await UserStore.getPassword()
  const user = await MultiSafeHelper.getDefaultUser(password)
  const newWallet = await createNewAccount(wallet, numberOfAccounts)

  KeyMaster.setWalletInUser(user, newWallet)

  await MultiSafeHelper.saveUser(user, password)

  return newWallet
}

/**
 * create a new account(s) and send back the address created
 * this method must get a valid wallet which has been retrieved from
 * MultiSafeHelper. Ideally this should be coming from the a
 * navigation property passed around.
 *
 * @param  {Wallet} wallet
 * @param  {number} numberOfAccounts=1
 */
const createNewAccount = async (wallet, numberOfAccounts = 1) => {
  if (!wallet.accountCreationKeyHash) {
    throw new Error(`The user's wallet passed in has no accountCreationKeyHash`)
  }

  const accountCreationKey =
    wallet.keys[wallet.accountCreationKeyHash].privateKey
  const pathIndexIncrementor = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.accountCreationKeyPath()
  )

  for (let i = 0; i < numberOfAccounts; i++) {
    const pathIndex = i + pathIndexIncrementor
    await _createAccount(accountCreationKey, pathIndex, wallet)
  }

  await AccountAPIHelper.populateWalletWithAddressData(wallet)

  return wallet
}

const _createAccount = async (
  accountCreationKey,
  childIndex,
  wallet,
  rootDerivedPath = KeyPathHelper.accountCreationKeyPath(),
  chainId = AppConstants.MAINNET_ADDRESS,
  recoveryPhraseBytes
) => {
  if (childIndex < 0) {
    throw new Error('You cannot create an index less than zero')
  }
  const account = new Account()

  let correctAccountCreationKey = accountCreationKey
  // So if rootDerivedPath is the empty string ('') then
  // we need to generate accounts at the root of the tree.
  // This was because in version 1.6 we genereated keys at root
  // and not at BIP44. This was fixed in 1.7 and most of our users
  // will have BIP44 addresses. However, there are about 40 or so
  // out there that do have their genesis accounts generated at root
  if (rootDerivedPath === '') {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryPhraseBytes
    )
    correctAccountCreationKey = rootPrivateKey
  }

  const childPath = rootDerivedPath + '/' + childIndex
  const privateKeyForAddress = await NativeModules.KeyaddrManager.child(
    correctAccountCreationKey,
    childIndex
  )
  account.ownershipKey = DataFormatHelper.create8CharHash(privateKeyForAddress)

  const privateKeyHash = DataFormatHelper.create8CharHash(privateKeyForAddress)
  const publicKey = await NativeModules.KeyaddrManager.toPublic(
    privateKeyForAddress
  )

  const newKey = KeyMaster.createKey(privateKeyForAddress, publicKey, childPath)
  wallet.keys[privateKeyHash] = newKey

  const address = await NativeModules.KeyaddrManager.ndauAddress(publicKey)
  account.address = address

  wallet.accounts[address] = account
}

export default {
  createAccounts,
  createNewAccount
}
