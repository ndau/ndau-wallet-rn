/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

class UserStore {
  constructor () {
    if (!UserStore.instance) {
      this._user = []
      this._password = []
      UserStore.instance = this
    }

    return UserStore.instance
  }

  setUser (user) {
    this._user[0] = user
  }

  getUser () {
    return this._user[0]
  }

  setPassword (password) {
    this._password[0] = password
  }

  getPassword () {
    return this._password[0]
  }
}

const instance = new UserStore()
Object.freeze(instance)

export default instance
