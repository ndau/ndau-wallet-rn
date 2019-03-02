export class NotifyTransaction {
  constructor (wallet, account) {
    this._wallet = wallet
    this._account = account

    this._keys = wallet.keys
    this._jsonTransaction = {}
    this._submitAddress = ''
    this._prevalidateAddress = ''

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this.transactionType = 'Notify'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.target = this._account.address
  }
}
