import Transaction from './Transaction'
import FlashNotification from '../components/FlashNotification'
import APIAddressHelper from '../helpers/APIAddressHelper'
import KeyMaster from '../helpers/KeyMaster'

class ClaimTransaction extends Transaction {
  static CLAIM_ACCOUNT = 'ClaimAccount'

  constructor (wallet, account, period) {
    super(wallet, account, period)
  }

  createSubmissionAddress = async () => {
    this._submitAddress =
      (await APIAddressHelper.getTransactionSubmitAPIAddress()) +
      '/' +
      ClaimTransaction.CLAIM_ACCOUNT
  }

  createPrevalidateAddress = async () => {
    this._prevalidateAddress =
      (await APIAddressHelper.getTransactionPrevalidateAPIAddress()) +
      '/' +
      ClaimTransaction.CLAIM_ACCOUNT
  }

  handleError = message => {
    console.warn(`Error from blockchain: ${message}`)
    FlashNotification.showError(
      `Problem occurred sending a ${
        ClaimTransaction.CLAIM_ACCOUNT
      } transaction for ${this._account.addressData.nickname}`
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

export default ClaimTransaction
