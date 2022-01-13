/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class OfflineError extends Error {
  constructor (...args) {
    if (args) {
      super(...args)
      this.message = args[0]
    }
    this.shouldDisplayOffline = true
  }
}

export default OfflineError
