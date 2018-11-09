import NodeAddressHelper from '../NodeAddressHelper'

const user = {
  userId: '7MP-4FV',
  addresses: [
    'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  ]
}

test('getAccountAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getAccountAPIAddress(user.addresses)).toBe(
    'https://' + NodeAddressHelper.SELECTED_NODE + '.api.ndau.tech/accounts'
  )
})

test('getMarketPriceAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getMarketPriceAPIAddress()).toBe(
    'https://' + NodeAddressHelper.SELECTED_NODE + '.api.ndau.tech/marketprice'
  )
})

test('getEaiPercentageAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getEaiPercentageAPIAddress()).toBe(
    'https://' +
      NodeAddressHelper.SELECTED_NODE +
      '.api.ndau.tech/eaipercentage'
  )
})
