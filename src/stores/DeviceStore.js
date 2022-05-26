/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import LogStore from '../stores/LogStore'

const instance = {
  _isOnline: null,

  setOnline: isOnline => {
    this._isOnline = Boolean(isOnline)
  },

  online: () => {
    if (process.env.NODE_ENV === 'test') {
      LogStore.log(
        'Returning true online status for testing environment.'
      )
      return true
    }
    return this._isOnline
  }
}

Object.freeze(instance)

export default instance
