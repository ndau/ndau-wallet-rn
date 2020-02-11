/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class NdauStore {
  constructor () {
    if (!NdauStore.instance) {
      this._marketPrice = []
      NdauStore.instance = this
    }

    return NdauStore.instance
  }

  setMarketPrice (marketPrice) {
    this._marketPrice[0] = marketPrice
  }

  getMarketPrice () {
    return this._marketPrice[0]
  }
}

const instance = new NdauStore()
Object.freeze(instance)

export default instance
