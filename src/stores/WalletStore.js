/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class WalletStore {
  constructor () {
    if (!WalletStore.instance) {
      this._wallet = []
      WalletStore.instance = this
    }

    return WalletStore.instance
  }

  setWallet (wallet) {
    this._wallet[0] = wallet
  }

  getWallet () {
    return this._wallet[0]
  }
}

const instance = new WalletStore()
Object.freeze(instance)

export default instance
