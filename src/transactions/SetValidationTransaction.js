import AccountAPIHelper from '../helpers/AccountAPIHelper'
import AppConfig from '../AppConfig'
import KeyMaster from '../helpers/KeyMaster'
import LoggingService from '../services/LoggingService'

export class SetValidationTransaction {
  constructor (wallet, account, sendType) {
    this._wallet = wallet
    this._account = account
    this._sendType = sendType

    this._keys = wallet.keys
    this._jsonTransaction = {}
    this._submitAddress = ''
    this._prevalidateAddress = ''

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this.transactionType = 'SetValidation'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.target = this._account.address

    const validationKeys = []
    this._account.validationKeys.forEach(validationKeyHash => {
      validationKeys.push(this._keys[validationKeyHash].publicKey)
    })

    this._jsonTransaction.ownership = this._keys[
      this._account.ownershipKey
    ].publicKey
    this._jsonTransaction.validation_keys = validationKeys
  }

  privateKeyForSigning = () => {
    return KeyMaster.getPrivateKeyFromHash(
      this._wallet,
      this._account.ownershipKey
    )
  }

  addSignatureToJsonTransaction = signature => {
    this._jsonTransaction.signature = signature
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
        `SetValidation not being sent as spendable ${spendable} is <= 0`
      )
    } else {
      await this.prevalidate()
      await this.submit()
    }
  }
}
