import DataFormatHelper from '../helpers/DataFormatHelper'

export class DelegateTransaction {
  constructor (wallet, account, node) {
    this._wallet = wallet
    this._account = account

    this._node = node
    this._keys = wallet.keys
    this._jsonTransaction = {}
    this._submitAddress = ''
    this._prevalidateAddress = ''

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this.transactionType = 'Delegate'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.target = this._account.address
    this._jsonTransaction.node = this._node
  }
}
