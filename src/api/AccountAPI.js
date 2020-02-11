/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import APIAddressHelper from '../helpers/APIAddressHelper'
import DataFormatHelper from '../helpers/DataFormatHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import LogStore from '../stores/LogStore'
import WalletStore from '../stores/WalletStore'

const _ = require('lodash')

const getAddressData = async addresses => {
  const accountAPI = await APIAddressHelper.getAccountsAPIAddress()
  try {
    const accountData = await APICommunicationHelper.post(
      accountAPI,
      JSON.stringify(addresses)
    )
    await AsyncStorageHelper.setLastAccountData(accountData)
    return accountData
  } catch (error) {
    LogStore.log(error)
    throw error
  }
}

const isAddressDataNew = async addresses => {
  // If there are no addresses passed then try to get it
  // out of the store
  if (!addresses) {
    const wallet = WalletStore.getWallet()
    if (wallet) {
      addresses = Object.keys(wallet.accounts)
    }
  }

  // If not in the store then we shortcut false
  if (!addresses) return false

  const accountAPI = await APIAddressHelper.getAccountsAPIAddress()
  try {
    const lastAccountData = await AsyncStorageHelper.getLastAccountData()

    // If we do not have any data yet, shortcircuit
    if (!lastAccountData) return false

    const accountData = await APICommunicationHelper.post(
      accountAPI,
      JSON.stringify(addresses)
    )
    return !_.isEqual(lastAccountData, accountData)
  } catch (error) {
    LogStore.log(error)
    throw new BlockchainAPIError(error)
  }
}

const getNextSequence = async address => {
  const accountAPI = await APIAddressHelper.getAccountAPIAddress()
  try {
    const accountData = await APICommunicationHelper.get(
      accountAPI + '/' + address
    )
    return accountData[address].sequence ? accountData[address].sequence + 1 : 1
  } catch (error) {
    LogStore.log(error)
    return 1
  }
}

const getEaiRate = async addressData => {
  const accountEaiRateRequestData = DataFormatHelper.getAccountEaiRateRequest(
    addressData
  )

  const eaiRateAddress = await APIAddressHelper.getEaiRateAPIAddress()
  try {
    return await APICommunicationHelper.post(
      eaiRateAddress,
      JSON.stringify(accountEaiRateRequestData)
    )
  } catch (error) {
    LogStore.log(error)
    throw new BlockchainAPIError(error)
  }
}

const getLockRates = async account => {
  const accountEaiRateRequestData = DataFormatHelper.getAccountEaiRateRequestForLock(
    account
  )

  const eaiRateAddress = await APIAddressHelper.getEaiRateAPIAddress()
  try {
    return await APICommunicationHelper.post(
      eaiRateAddress,
      JSON.stringify(accountEaiRateRequestData)
    )
  } catch (error) {
    LogStore.log(error)
    throw new BlockchainAPIError(error)
  }
}

const accountHistory = async address => {
  const accountHistoryAddress = await APIAddressHelper.getAccountHistoryAPIAddress(
    address
  )
  try {
    return await APICommunicationHelper.get(accountHistoryAddress)
  } catch (error) {
    LogStore.log(error)
    throw new BlockchainAPIError(error)
  }
}

export default {
  getAddressData,
  getEaiRate,
  accountHistory,
  isAddressDataNew,
  getNextSequence,
  getLockRates
}
