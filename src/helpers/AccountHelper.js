/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import UserStore from '../stores/UserStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import KeyMaster from '../helpers/KeyMaster'

const createAccounts = async (wallet, numberOfAccounts = 1) => {
  const password = await UserStore.getPassword()
  const user = await MultiSafeHelper.getDefaultUser(password)
  const newWallet = await KeyMaster.createNewAccount(wallet, numberOfAccounts)

  KeyMaster.setWalletInUser(user, newWallet)

  await MultiSafeHelper.saveUser(user, password)

  return newWallet
}

export default {
  createAccounts
}
