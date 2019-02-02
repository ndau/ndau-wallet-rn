import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

export class LockTransaction {
  constructor (wallet, account, period) {
    this._wallet = wallet
    this._account = account
    this._period = period

    this._keys = wallet.keys
    this._jsonTransaction = {}
    this._submitAddress = ''
    this._prevalidateAddress = ''

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this._period = period
    this.LOCK = 'Lock'
  }

  createSubmissionAddress = async () => {
    this._submitAddress =
      (await APIAddressHelper.getTransactionSubmitAPIAddress()) +
      '/' +
      this.LOCK
  }

  createPrevalidateAddress = async () => {
    this._prevalidateAddress =
      (await APIAddressHelper.getTransactionPrevalidateAPIAddress()) +
      '/' +
      this.LOCK
  }

  handleError = message => {
    console.warn(`Error from blockchain: ${message}`)
    FlashNotification.showError(
      `Problem occurred sending a ${this.LOCK} transaction for ${
        this._account.addressData.nickname
      }`
    )
    throw new Error(message)
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.period = this._period
  }
}
