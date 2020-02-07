/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AccountAPI from '../api/AccountAPI'
import TransactionAPI from '../api/TransactionAPI'
import DateHelper from './DateHelper'
import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'
import AppConfig from '../AppConfig'

const getAccountHistory = async address => {
  const accountHistory = await AccountAPI.accountHistory(address)
  if (accountHistory.Items) {
    for (let i = 0; i < accountHistory.Items.length; i++) {
      const txHistory = await TransactionAPI.transactionByHash(
        accountHistory.Items[i].TxHash
      )
      accountHistory.Items[i].txDetail = txHistory.Tx
    }
  }

  return accountHistory
}

const hasItems = accountHistory => {
  return accountHistory.Items
}

const getTransactionDate = item => {
  return DateHelper.getDate(item.Timestamp)
}

const getTransactionId = item => {
  return item.TxHash
}

const getTransactionDestination = item => {
  // TODO: THIS MAY NOT BE GOOD! My assumption is
  // that this is an array for a reason but there is currently
  // only one in here
  return item.txDetail.Transactable.dst
    ? item.txDetail.Transactable.dst[0]
    : null
}

const getTransactionSource = item => {
  // TODO: THIS MAY NOT BE GOOD! My assumption is
  // that this is an array for a reason but there is currently
  // only one in here
  return item.txDetail.Transactable.src
    ? item.txDetail.Transactable.src[0]
    : null
}

const getTransactionType = accountHistory => {
  return AppConstants.TRANSACTION_TYPES[accountHistory.txDetail.TransactableID]
}

const getTransactionBalance = accountHistory => {
  return DataFormatHelper.getNdauFromNapu(
    accountHistory.Balance,
    AppConfig.NDAU_SUMMARY_PRECISION,
    true
  )
}

export default {
  getAccountHistory,
  hasItems,
  getTransactionDate,
  getTransactionId,
  getTransactionType,
  getTransactionBalance,
  getTransactionDestination,
  getTransactionSource
}
