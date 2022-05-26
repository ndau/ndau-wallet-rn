/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'

const accountCreationKeyPath = () => {
  return (
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.ACCOUNT_CREATION_KEY_CHILD
  )
}

const validationKeyPath = () => {
  return accountCreationKeyPath() + '/' + AppConstants.VALIDATION_KEY + "'"
}

const legacyValidationKeyPath1 = () => {
  return (
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.LEGACY_VALIDATION_KEY
  )
}

const legacyValidationKeyPath2 = () => {
  return accountCreationKeyPath() + '/' + AppConstants.VALIDATION_KEY
}

const legacyValidationKeyPath3 = () => {
  return legacyValidationKeyPath2()
}

const legacyValidationKeyPath4 = () => {
  return legacyValidationKeyPath2()
}

const isBIP44 = address => {
  return address.startsWith('/44')
}

const getRootAccountValidationKeyPath = (wallet, account) => {
  const accountPath = wallet.keys[account.ownershipKey].path
  let accountChildIndex = ''
  if (isBIP44(accountPath)) {
    accountChildIndex = accountPath.substring(
      accountCreationKeyPath().length + 1,
      accountPath.length
    )
  } else {
    // we have an old root account. So make sure you just get
    // that one.
    accountChildIndex = accountPath.substring(1, accountPath.length)
  }

  return `${validationKeyPath()}/${accountChildIndex}'`
}

const getLegacy2Thru4RootAccountValidationKeyPath = (wallet, account) => {
  const accountPath = wallet.keys[account.ownershipKey].path
  let accountChildIndex = ''
  if (isBIP44(accountPath)) {
    accountChildIndex = accountPath.substring(
      accountCreationKeyPath().length + 1,
      accountPath.length
    )
  } else {
    // we have an old root account. So make sure you just get
    // that one.
    accountChildIndex = accountPath.substring(1, accountPath.length)
  }

  return `${legacyValidationKeyPath2()}/${accountChildIndex}`
}

const getLegacy2Thru4AccountValidationKeyPath = (wallet, account, index) => {
  const rootAccountValidationPath = getLegacy2Thru4RootAccountValidationKeyPath(
    wallet,
    account
  )
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(wallet, validationKeyPath())
  }
  return `${rootAccountValidationPath}/${index}`
}

const getAccountValidationKeyPath = (wallet, account, index) => {
  const rootAccountValidationPath = getRootAccountValidationKeyPath(
    wallet,
    account
  )
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(wallet, rootAccountValidationPath)
  }
  return `${rootAccountValidationPath}/${index}`
}

export default {
  accountCreationKeyPath,
  validationKeyPath,
  getLegacy2Thru4RootAccountValidationKeyPath,
  getLegacy2Thru4AccountValidationKeyPath,
  legacyValidationKeyPath1,
  legacyValidationKeyPath2,
  legacyValidationKeyPath3,
  legacyValidationKeyPath4,
  getAccountValidationKeyPath,
  getRootAccountValidationKeyPath
}
