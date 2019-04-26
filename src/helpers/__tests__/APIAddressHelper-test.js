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
  expect(accountsUrl.indexOf('.api.ndau.tech/account/accounts') !== -1).toBe(
    true
  )
})

test('getAccountAPIAddress sends back the correct address', async () => {
  const accountsUrl = await APIAddressHelper.getAccountAPIAddress()
  expect(accountsUrl.indexOf('.api.ndau.tech/account/account') !== -1).toBe(
    true
  )
})

test('getMarketPriceAPIAddress sends back the correct address', async () => {
  const marketPriceUrl = await APIAddressHelper.getMarketPriceAPIAddress()
  expect(marketPriceUrl.indexOf('.api.ndau.tech/price/current') !== -1).toBe(
    true
  )
})

test('getEaiRateAPIAddress sends back the correct address', async () => {
  const eaiValueForDisplayUrl = await APIAddressHelper.getEaiRateAPIAddress()
  expect(
    eaiValueForDisplayUrl.indexOf('.api.ndau.tech/account/eai/rate') !== -1
  ).toBe(true)
})

test('getTransactionPrevalidateAPIAddress sends back the correct address', async () => {
  const eaiValueForDisplayUrl = await APIAddressHelper.getTransactionPrevalidateAPIAddress()
  expect(
    eaiValueForDisplayUrl.indexOf('.api.ndau.tech/tx/prevalidate') !== -1
  ).toBe(true)
})

test('getTransactionSubmitAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getTransactionSubmitAPIAddress()
  expect(submitUrl.indexOf('.api.ndau.tech/tx/submit') !== -1).toBe(true)
})

test('getAccountHistoryAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getAccountHistoryAPIAddress(
    '1234asdf'
  )
  expect(
    submitUrl.indexOf('.api.ndau.tech/account/history/1234asdf') !== -1
  ).toBe(true)
})

test('getTransactionByHashAPIAddress sends back the correct address', async () => {
  const submitUrl = await APIAddressHelper.getTransactionByHashAPIAddress(
    '1234asdf'
  )
  expect(submitUrl.indexOf('.api.ndau.tech/transaction/1234asdf') !== -1).toBe(
    true
  )
})
