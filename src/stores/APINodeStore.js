/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class APINodeStore {
  constructor () {
    if (!APINodeStore.instance) {
      this._apiNodeStore = []
      this._apiNodeStore.sort((a, b) => {
        return a[1] - b[1]
      })

      APINodeStore.instance = this
    }

    return APINodeStore.instance
  }

  addNode (node) {
    this._apiNodeStore[0].node[node] = 0
  }

}

const instance = new APINodeStore()
Object.freeze(instance)

export default instance
