import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

export class TransferTransaction {
  constructor (wallet, account, destination, quantity) {
    this._wallet = wallet
    this._account = account

    this._destination = destination
    this._quantity = quantity
    this._keys = wallet.keys
    this._jsonTransaction = {}
    this._submitAddress = ''
    this._prevalidateAddress = ''

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this.transactionType = 'Transfer'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.qty = this._quantity
    this._jsonTransaction.destination = this._destination
    this._jsonTransaction.source = this._account.address
  }
}
