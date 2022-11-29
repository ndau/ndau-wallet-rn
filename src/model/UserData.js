/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */
import AccountAPIHelper from '../helpers/AccountAPIHelper';
import OrderAPI from '../api/OrderAPI';
import MultiSafeHelper from '../helpers/MultiSafeHelper';
import UserStore from '../stores/UserStore';
import NdauStore from '../stores/NdauStore';

// ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
// IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
// import UserTestData from '../helpers/UserTestData'

const loadUserData = async user => {
  if (!user) return;

  const walletKeys = Object.keys(user.wallets);

  NdauStore.setMarketPrice(await OrderAPI.getMarketPrice(user));
  // if marketPrice is falsey then we should use the one we have
  // stored within the user.defaults object
  if (
    !NdauStore.getMarketPrice() &&
    user.defaults &&
    user.defaults.marketPrice
  ) {
    NdauStore.setMarketPrice(user.defaults.marketPrice);
  }

  for (const walletKey of walletKeys) {
    const wallet = user.wallets[walletKey];
    const dataFound = await AccountAPIHelper.populateWalletWithAddressData(
      wallet,
    );

    // after the data is loaded successfully then save the user
    const password = await UserStore.getPassword();
    // double check that both are truthy, user should be if password is
    // so we could just check for password, but if they are not we might
    // have other problems.
    // Also make sure that you have found data, if not we stand the risk
    // of blowing away data that is present
    // ATTENTION - DO NOT REMOVE THIS COMMENTED CODE!
    // IF YOU WOULD LIKE TO TEST LOG USER DATA UNCOMMENT THIS
    if (/*! UserTestData.user && */ user && password && dataFound) {
      await MultiSafeHelper.saveUser(user, password);
    }
  }

  UserStore.setUser(user);
};

export default {
  loadUserData: loadUserData,
};
