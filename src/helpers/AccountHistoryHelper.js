import AccountAPI from '../api/AccountAPI'
import TransactionAPI from '../api/TransactionAPI'
import DateHelper from './DateHelper'
import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'

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
  return item.txDetail.Transactable.dst
}

const getTransactionType = accountHistory => {
  return AppConstants.TRANSACTION_TYPES[accountHistory.txDetail.TransactableID]
}

const getTransactionBalance = accountHistory => {
  return DataFormatHelper.addCommas(
    DataFormatHelper.getNdauFromNapu(accountHistory.Balance)
  )
}

export default {
  getAccountHistory,
  hasItems,
  getTransactionDate,
  getTransactionId,
  getTransactionType,
  getTransactionBalance,
  getTransactionDestination
}
