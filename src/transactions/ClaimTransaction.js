class ClaimTransaction {
  constructor (account, keys, signature) {
    this._account = account
    this._keys = keys
    this._signature = signature
  }

  create = () => {
    if (
      !this._account.validationKeys ||
      this._account.validationKeys.length === 0
    ) {
      throw Error('No validation keys present')
    }
    if (!this._account.addressData.sequence) {
      console.log('GOT HERE')
      throw Error('No sequence found in addressData')
    }

    const validationKeys = []
    this._account.validationKeys.forEach(validationKeyHash => {
      validationKeys.push(this._keys[validationKeyHash].publicKey)
    })

    return {
      target: this._account.address,
      ownership: this._keys[this._account.ownershipKey].publicKey,
      validation_keys: validationKeys,
      sequence: this._account.addressData.sequence + 1,
      signature: this._signature
    }
  }
}

export default ClaimTransaction
