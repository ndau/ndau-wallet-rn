import AccountAPI from '../api/AccountAPI'
import TransactionAPI from '../api/TransactionAPI'
import DateHelper from './DateHelper'

const getAccountHistory = async address => {
  const accountHistory = await AccountAPI.accountHistory(address)
  if (accountHistory.Items) {
    for (let i = 0; i < accountHistory.Items.length; i++) {
      const txHistory = await TransactionAPI.transactionByHash(
        accountHistory.Items[i].TxHash
      )
      accountHistory.Items[i].txDetail = txHistory
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

export default {
  getAccountHistory,
  hasItems,
  getTransactionDate,
  getTransactionId
}
