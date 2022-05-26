/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import ServiceDiscovery from '../api/ServiceDiscovery'

const getNodeAddress = async type => {
  return await ServiceDiscovery.getNodeAddress(type)
}

const getAccountsAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/accounts'
}

const getAccountAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/account'
}

const getEaiRateAPIAddress = async () => {
  return (await getNodeAddress()) + '/system/eai/rate'
}

const getMarketPriceAPIAddress = async () => {
  return (await getNodeAddress()) + '/price/current'
}

const getTransactionPrevalidateAPIAddress = async sendType => {
  return (await getNodeAddress(sendType)) + '/tx/prevalidate'
}

const getTransactionSubmitAPIAddress = async sendType => {
  return (await getNodeAddress(sendType)) + '/tx/submit'
}

const getAccountHistoryAPIAddress = async address => {
  return (await getNodeAddress()) + `/account/history/${address}`
}

const getTransactionByHashAPIAddress = async transactionHash => {
  // transaction hash's can contain characters that must be encoded
  // for a URI
  const urlEncodedTransactionHash = encodeURIComponent(transactionHash)
  return (await getNodeAddress()) + `/transaction/${urlEncodedTransactionHash}`
}

export default {
  getAccountAPIAddress,
  getAccountsAPIAddress,
  getMarketPriceAPIAddress,
  getEaiRateAPIAddress,
  getTransactionPrevalidateAPIAddress,
  getTransactionSubmitAPIAddress,
  getAccountHistoryAPIAddress,
  getTransactionByHashAPIAddress
}
