class ClaimTransaction {
  constructor (account, keys) {
    this._account = account
    this._keys = keys
  }

  create = () => {
    if (
      !this._account.validationKeys ||
      this._account.validationKeys.length === 0
    ) {
      throw Error('No validation keys present')
    }
    if (isNaN(this._account.addressData.sequence)) {
      throw Error('No sequence found in addressData')
    }

    const validationKeys = []
    this._account.validationKeys.forEach(validationKeyHash => {
      validationKeys.push(this._keys[validationKeyHash].publicKey)
    })

    // SEQUENCE needs to be gotten from a utility/helper from
    // blockchain directly
    return {
      target: this._account.address,
      ownership: this._keys[this._account.ownershipKey].publicKey,
      validation_keys: validationKeys,
      sequence: this._account.addressData.sequence + 1
    }
  }

  sign = (jsonClaimTransaction, signature) => {
    jsonClaimTransaction.signature = signature
    return jsonClaimTransaction
  }
}

export default ClaimTransaction
