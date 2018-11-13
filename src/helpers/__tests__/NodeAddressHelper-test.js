import NodeAddressHelper from '../NodeAddressHelper'
import services from '../../api/services-dev.json'

const user = {
  userId: '7MP-4FV',
  addresses: [
    'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  ]
}

test('getAccountAPIAddress sends back the correct address', async () => {
  fetch.mockResponseOnce(services)
  const accountsUrl = await NodeAddressHelper.getAccountAPIAddress()
  expect(accountsUrl.indexOf('.api.ndau.tech/account/accounts') !== -1).toBe(
    true
  )
})

test('getMarketPriceAPIAddress sends back the correct address', async () => {
  fetch.mockResponseOnce(services)
  const marketPriceUrl = await NodeAddressHelper.getMarketPriceAPIAddress()
  expect(marketPriceUrl.indexOf('.api.ndau.tech/order/current') !== -1).toBe(
    true
  )
})

test('getEaiRateAPIAddress sends back the correct address', async () => {
  fetch.mockResponseOnce(services)
  const eaiPercentageUrl = await NodeAddressHelper.getEaiRateAPIAddress()
  expect(
    eaiPercentageUrl.indexOf('.api.ndau.tech/account/eai/rate') !== -1
  ).toBe(true)
})
