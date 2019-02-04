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
    this.transactionType = 'Lock'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.period = this._period
    this._jsonTransaction.target = this._account.address
  }
}
