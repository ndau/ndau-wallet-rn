/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class AccountStore {
  constructor () {
    if (!AccountStore.instance) {
      this._account = []
      AccountStore.instance = this
    }

    return AccountStore.instance
  }

  setAccount (account) {
    this._account[0] = account
  }

  getAccount () {
    return this._account[0]
  }
}

const instance = new AccountStore()
Object.freeze(instance)

export default instance
