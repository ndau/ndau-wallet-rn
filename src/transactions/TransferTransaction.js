import DataFormatHelper from '../helpers/DataFormatHelper'

export class TransferTransaction {
  constructor (wallet, account, destination, quantity) {
    this._wallet = wallet
    this._account = account

    this._destination = destination
    // The assumption here is that we get ndau sent to this
    // quantity. The API must have napu so we perform the
    // conversion here
    this._quantity = DataFormatHelper.getNapuFromNdau(quantity)
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

  getSignature = () => {
    return this._jsonTransaction.signatures
  }

  async createSignPrevalidateSubmit () {
    try {
      await this.create()
      await this.sign()
      await this.prevalidate()
      await this.submit()
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }
}
