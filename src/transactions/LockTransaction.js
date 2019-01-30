import Transaction from './Transaction'
import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

class LockTransaction extends Transaction {
  static LOCK = 'Lock'

  constructor (wallet, account, period) {
    super(wallet, account)
    this._period = period
  }

  createSubmissionAddress = async () => {
    this._submitAddress =
      (await APIAddressHelper.getTransactionSubmitAPIAddress()) +
      '/' +
      LockTransaction.LOCK
  }

  createPrevalidateAddress = async () => {
    this._prevalidateAddress =
      (await APIAddressHelper.getTransactionPrevalidateAPIAddress()) +
      '/' +
      LockTransaction.LOCK
  }

  handleError = message => {
    console.warn(`Error from blockchain: ${message}`)
    FlashNotification.showError(
      `Problem occurred sending a ${LockTransaction.LOCK} transaction for ${
        this._account.addressData.nickname
      }`
    )
    throw new Error(message)
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.period = this._period
  }
}

export default LockTransaction
