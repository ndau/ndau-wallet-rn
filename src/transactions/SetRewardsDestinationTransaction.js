/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

export class SetRewardsDestinationTransaction {
  constructor (wallet, account, destination) {
    this._wallet = wallet
    this._account = account

    this._destination = destination
    this._keys = wallet.keys
    this._jsonTransaction = {}

    if (!this._wallet || !this._account) {
      throw new Error('You must pass wallet and account')
    }

    this.transactionType = 'SetRewardsDestination'
  }

  addToJsonTransaction = () => {
    this._jsonTransaction.target = this._account.address
    this._jsonTransaction.destination = this._destination
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
