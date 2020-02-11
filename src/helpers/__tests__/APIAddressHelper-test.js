/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import APIAddressHelper from '../APIAddressHelper'
import services from '../../api/services-dev.json'

import MockHelper from '../MockHelper'

MockHelper.mockServiceDiscovery()
MockHelper.mockAccountsAPI()
MockHelper.mockAccountAPI()
MockHelper.mockEaiRate()
MockHelper.mockMarketPriceAPI()

test('getAccountsAPIAddress sends back the correct address', async () => {
  const accountsUrl = await APIAddressHelper.getAccountsAPIAddress()
  expect(
    accountsUrl.indexOf('api.ndau.tech:31300/account/accounts') !== -1
  ).toBe(true)
})

test('getAccountAPIAddress sends back the correct address', async () => {
  const accountsUrl = await APIAddressHelper.getAccountAPIAddress()
  expect(
    accountsUrl.indexOf('api.ndau.tech:31300/account/account') !== -1
  ).toBe(true)
})

test('getMarketPriceAPIAddress sends back the correct address', async () => {
  const marketPriceUrl = await APIAddressHelper.getMarketPriceAPIAddress()
  expect(
    marketPriceUrl.indexOf('api.ndau.tech:31300/price/current') !== -1
  ).toBe(true)
})

test('getEaiRateAPIAddress sends back the correct address', async () => {
  const eaiValueForDisplayUrl = await APIAddressHelper.getEaiRateAPIAddress()
  expect(
    eaiValueForDisplayUrl.indexOf('api.ndau.tech:31300/system/eai/rate') !== -1
  ).toBe(true)
})

test('getTransactionPrevalidateAPIAddress sends back the correct address', async () => {
  const eaiValueForDisplayUrl = await APIAddressHelper.getTransactionPrevalidateAPIAddress()
  expect(
    eaiValueForDisplayUrl.indexOf('api.ndau.tech:31300/tx/prevalidate') !== -1
  ).toBe(true)
})

test('getTransactionPrevalidateAPIAddress sends back the correct address for recovery', async () => {
  const eaiValueForDisplayUrl = await APIAddressHelper.getTransactionPrevalidateAPIAddress(
    APIAddressHelper.RECOVERY
  )
  expect(
    eaiValueForDisplayUrl.indexOf('recovery.ndau.tech/tx/prevalidate') !== -1
  ).toBe(true)
})

test('getTransactionSubmitAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getTransactionSubmitAPIAddress()
  expect(submitUrl.indexOf('api.ndau.tech:31300/tx/submit') !== -1).toBe(true)
})

test('getTransactionSubmitAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getTransactionSubmitAPIAddress(
    APIAddressHelper.RECOVERY
  )
  expect(submitUrl.indexOf('recovery.ndau.tech/tx/submit') !== -1).toBe(true)
})

test('getAccountHistoryAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getAccountHistoryAPIAddress(
    '1234asdf'
  )
  expect(
    submitUrl.indexOf('api.ndau.tech:31300/account/history/1234asdf') !== -1
  ).toBe(true)
})

test('getTransactionByHashAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getTransactionByHashAPIAddress(
    '1234asdf'
  )
  expect(
    submitUrl.indexOf('api.ndau.tech:31300/transaction/1234asdf') !== -1
  ).toBe(true)
})
