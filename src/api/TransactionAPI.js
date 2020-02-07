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
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LogStore from '../stores/LogStore'

const _postTransaction = async (submitAddress, transaction) => {
  LogStore.log(
    `TransactionAPI._postTransaction submitAddress: ${submitAddress} transaction: ${JSON.stringify(
      transaction
    )}`
  )
  try {
    return await APICommunicationHelper.post(
      submitAddress,
      JSON.stringify(transaction)
    )
  } catch (error) {
    LogStore.log(`TransactionAPI._postTransaction ${JSON.stringify(error)}`)
    throw error
  }
}

const prevalidate = async (submitAddress, transaction) => {
  return await _postTransaction(submitAddress, transaction)
}

const submit = async (submitAddress, transaction) => {
  return await _postTransaction(submitAddress, transaction)
}

const transactionByHash = async transactionHash => {
  LogStore.log(
    `TransactionAPI.transactionByHash ${JSON.stringify(transactionHash)}`
  )
  try {
    const transactionByHashAddress = await APIAddressHelper.getTransactionByHashAPIAddress(
      transactionHash
    )
    return await APICommunicationHelper.get(transactionByHashAddress)
  } catch (error) {
    LogStore.log(`TransactionAPI.transactionByHash ${JSON.stringify(error)}`)
    throw new BlockchainAPIError(error)
  }
}

export default {
  prevalidate,
  submit,
  transactionByHash
}
