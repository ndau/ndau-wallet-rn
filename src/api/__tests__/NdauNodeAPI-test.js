import NdauNodeAPI from '../NdauNodeAPI'
import data from '../data'

const user = data.testUser

test('getAddressData should return something back', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData))

  const ndau = await NdauNodeAPI.getAddressData(user)

  console.log(`getAddressData returns to ${JSON.stringify(ndau, null, 2)}`)

  expect(ndau).toBeDefined()
})

test('getMarketPrice should return something back', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData))

  const marketPrice = await NdauNodeAPI.getMarketPrice(user)

  console.log(
    `getMarketPrice returns to ${JSON.stringify(marketPrice, null, 2)}`
  )

  expect(marketPrice).toBeDefined()
})
