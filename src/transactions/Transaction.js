import { NativeModules } from 'react-native'
import KeyMaster from '../helpers/KeyMaster'
import TransactionAPI from '../api/TransactionAPI'
import TxSignPrep from '../model/TxSignPrep'
import FlashNotification from '../components/common/FlashNotification'
import LogStore from '../stores/LogStore'
import AccountAPI from '../api/AccountAPI'
import {ErrorsByMessage, Messages} from '../errors/BlockchainAPIError'
import APIAddressHelper from '../helpers/APIAddressHelper'

export const Transaction = {
  /**
   * Create a transaction and store information internally
   */
  async create () {
    try {
      // Create the prevalidate and submission addresses
      await this.createPrevalidateAddress()
      await this.createSubmissionAddress()

      // ok...if we got here we can assume we do NOT have a validation
      // key, so we need that to call KeyaddrManager.sign...so create it
      // but only if there are none present. This business logic may
      // change in the future, but for now, we only create one validation
      // key per account here
      if (
        this._account.validationKeys &&
        this._account.validationKeys.length === 0
      ) {
        await KeyMaster.addValidationKey(this._wallet, this._account)
      }

      if (
        !this._account.validationKeys ||
        this._account.validationKeys.length === 0
      ) {
        throw Error('No validation keys present')
      }
      if (isNaN(this._account.addressData.sequence)) {
        throw ErrorsByMessage[Messages.SRC_NO_HISTORY]
      }

      const sequence = await AccountAPI.getNextSequence(this._account.address)
      this._jsonTransaction = {
        sequence
      }

      this.addToJsonTransaction()

      return this._jsonTransaction
    } catch (error) {
      this.handleError(error)
    }
  },

  handleError (msgOrErr) {
    LogStore.log(`Error from blockchain: ${msgOrErr}`)
    let msg = `Problem occurred sending a ${this.transactionType} for ${
      this._account.addressData.nickname
    }`
    if (msgOrErr instanceof Error) {
      // If it was an error, append the message to the flash message
      msg += `: ${msgOrErr.message}`
    }
    FlashNotification.showError(msg)
    if (msgOrErr instanceof Error) {
      throw msgOrErr
    } else {
      throw new Error(msgOrErr)
    }
  },

  /**
   * Sign the transaction for prevalidation and submission. You must
   * call `create` first before you call this method.
   */
  async sign () {
    try {
      // Here we get the ownership key to sign for SetValidation. This is
      // the ONLY time we use the ownershipKey. Any subsequent/other
      // transactions use the validationKey within the account
      const privateKeyFromHash = this.privateKeyForSigning()

      // Use the TxSignPrep to get it ready to send
      const preparedTransaction = new TxSignPrep().prepare(
        this._jsonTransaction
      )
      const base64EncodedPrepTx = preparedTransaction.b64encode()

      // Get the signature to use in the transaction
      const signature = await NativeModules.KeyaddrManager.sign(
        privateKeyFromHash,
        base64EncodedPrepTx
      )

      this.addSignatureToJsonTransaction(signature)
    } catch (error) {
      this.handleError(error.message)
    }
  },

  privateKeyForSigning () {
    return KeyMaster.getPrivateKeyFromHash(
      this._wallet,
      this._account.validationKeys[0]
    )
  },

  addSignatureToJsonTransaction (signature) {
    this._jsonTransaction.signatures = [signature]
  },

  /**
   * Send this transaction to the blockchain to see if all is well.
   * You must first call `create` and `sign` before you call this. If all
   * is well you can then call `submit`.
   */
  async prevalidate () {
    const response = await TransactionAPI.prevalidate(
      this._prevalidateAddress,
      this._jsonTransaction
    )
    if (response.err) {
      this.handleError(response.err)
    } else {
      return response
    }
  },

  /**
   * This is the last call that you should make. You must call
   * `create`, `sign` and `prevalidate` before you `submit` to
   * the blockchain.
   */
  async submit () {
    try {
      const response = await TransactionAPI.submit(
        this._submitAddress,
        this._jsonTransaction
      )
      if (response.err) {
        this.handleError(response.err)
      } else {
        // Successful transaction so update
        // the account with the new sequence
        this._account.addressData.sequence = this._jsonTransaction.sequence
        return response
      }
    } catch (error) {
      this.handleError(error)
    }
  },

  async createSubmissionAddress () {
    const submitAddressPre = await APIAddressHelper.getTransactionSubmitAPIAddress(
      this._sendType
    )
    this._submitAddress = submitAddressPre + '/' + this.transactionType

    LogStore.log(`Submit address is ${this._submitAddress}`)
    LogStore.log(`Send type is ${this._sendType}`)
  },

  async createPrevalidateAddress () {
    const prevalidateAddressPre = await APIAddressHelper.getTransactionPrevalidateAPIAddress(
      this._sendType
    )
    this._prevalidateAddress =
      prevalidateAddressPre + '/' + this.transactionType

    LogStore.log(`Prevalidate address is ${this._prevalidateAddress}`)
    LogStore.log(`Send type is ${this._sendType}`)
  }
}
