/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import User from '../model/User'
import MultiSafe from '../model/MultiSafe'
import LogStore from '../stores/LogStore'
// ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
// IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
// import UserTestData from './UserTestData'

/**
 * Check to see if the userId and recoveryPhrase pased in
 * exists in the wallet. If it does then we send back true
 * @param {string} userId User.userId
 * @param {string} recoveryPhrase 12 words phrase/combo
 */
const recoveryPhraseAlreadyExists = async (userId, recoveryPhrase) => {
  const multiSafe = new MultiSafe()

  try {
    return await multiSafe.doesMultiSafeExist(
      userId.replace(/\s+/g, ''),
      recoveryPhrase
    )
  } catch (error) {}
  return false
}

/**
 * This passes back the default user. At this time the default user
 * is the first user in the phoneData object.
 *
 * If UserTestData.user is defined then
 * have the wallet use that as its user
 *
 * @param {string} encryptionPassword any password combination to get at phoneData
 */
const getDefaultUser = async encryptionPassword => {
  // ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
  // IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
  // if (UserTestData.user) {
  //   return UserTestData.user
  // }

  const multiSafe = new MultiSafe()
  let user = null
  // get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys()
  // TODO: storageKeys[0] is a workaround for single user
  // once we have multiple users we will need to revisit this
  if (storageKeys && storageKeys[0] && encryptionPassword) {
    // call create to initialize the storageKey
    // Iterate through array to get to the right key
    await multiSafe.create(storageKeys[0], encryptionPassword)
    // actually get the data
    user = await multiSafe.retrieve(encryptionPassword)
  }

  return user
}

/**
 * Save a user to MultiSafe with the corresponding password.
 *
 * @param {User} user User to be saved into MultiSafe
 * @param {string} encryptionPassword to save it in with
 * @param {string} recoveryPhraseString as another combination to use
 */
const saveUser = async (user, encryptionPassword, recoveryPhraseString, walletId = null) => {
  if (!walletId) {
    walletId = user.userId
  }

  const multiSafe = new MultiSafe()

  LogStore.log(
    `Persisting key ${walletId} into MultiSafe: ${JSON.stringify(user)}`
  )

  // create a multisafe
  await multiSafe.create(walletId.replace(/\s+/g, ''), encryptionPassword)
  // store the phone data
  await multiSafe.store(user, encryptionPassword)
  // add recovery phrase as combination so we can unlock with this
  if (recoveryPhraseString) {
    await multiSafe.addCombination(recoveryPhraseString, encryptionPassword)
  }

  return user
}

/**
 * To the outside world this is a password reset. However, for multisafe
 * this is merely adding a new combination given an existing one.
 *
 * @param {string} recoveryPhraseString
 * @param {string} newPassword
 */
const resetPassword = async (recoveryPhraseString, newPassword) => {
  const multiSafe = new MultiSafe()

  // get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys()
  // call create to initialize the storageKey
  await multiSafe.create(storageKeys[0], recoveryPhraseString)
  // add a combination to the safe
  await multiSafe.overwritePassword(newPassword, recoveryPhraseString)
}

export default {
  getDefaultUser,
  saveUser,
  resetPassword,
  recoveryPhraseAlreadyExists
}
