import AccountAPIHelper from '../helpers/AccountAPIHelper'
import LoggingService from '../services/LoggingService'
import AppConfig from '../AppConfig'

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

  async createSignPrevalidateSubmit () {
    const spendable = AccountAPIHelper.spendableNdau(
      this._account.addressData,
      true,
      AppConfig.NDAU_DETAIL_PRECISION
    )
    await this.create()
    await this.sign()
    if (spendable <= 0) {
      LoggingService.debug(
        `Delegate not being sent as spendable ${spendable} is <= 0`
      )
    } else {
      await this.prevalidate()
      await this.submit()
    }
  }
}
