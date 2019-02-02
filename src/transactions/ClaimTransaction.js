import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

export class ClaimTransaction {
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

    this.CLAIM_ACCOUNT = 'ClaimAccount'
  }

  createSubmissionAddress = async () => {
    this._submitAddress =
      (await APIAddressHelper.getTransactionSubmitAPIAddress()) +
      '/' +
      this.CLAIM_ACCOUNT
  }

  createPrevalidateAddress = async () => {
    this._prevalidateAddress =
      (await APIAddressHelper.getTransactionPrevalidateAPIAddress()) +
      '/' +
      this.CLAIM_ACCOUNT
  }

  handleError = message => {
    console.warn(`Error from blockchain: ${message}`)
    FlashNotification.showError(
      `Problem occurred sending a ${this.CLAIM_ACCOUNT} transaction for ${
        this._account.addressData.nickname
      }`
    )
    throw new Error(message)
  }

  addToJsonTransaction = () => {
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
    this._jsonTransaction.signature = [signature]
  }
}
