import Transaction from './Transaction'
import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

class NotifyTransaction extends Transaction {
  static NOTIFY = 'Notify'

  constructor (wallet, account, period) {
    super(wallet, account)
    this._period = period
  }

  createSubmissionAddress = async () => {
    this._submitAddress =
      (await APIAddressHelper.getTransactionSubmitAPIAddress()) +
      '/' +
      NotifyTransaction.NOTIFY
  }

  createPrevalidateAddress = async () => {
    this._prevalidateAddress =
      (await APIAddressHelper.getTransactionPrevalidateAPIAddress()) +
      '/' +
      NotifyTransaction.NOTIFY
  }

  handleError = message => {
    console.warn(`Error from blockchain: ${message}`)
    FlashNotification.showError(
      `Problem occurred sending a ${NotifyTransaction.NOTIFY} transaction for ${
        this._account.addressData.nickname
      }`
    )
    throw new Error(message)
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.period = this._period
  }
}

export default NotifyTransaction
