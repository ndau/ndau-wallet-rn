import OrderNodeAPI from '../OrderNodeAPI'
import NdauNodeAPI from '../NdauNodeAPI'
import data from '../data'
import services from '../../api/services.json'

const user = data.testUser

test('getAddressData should return something back', async () => {
  fetch.mockResponseOnce(JSON.stringify(data.testAddressData))

  const ndau = await NdauNodeAPI.getAddressData(user)

  console.log(`getAddressData returns to ${JSON.stringify(ndau, null, 2)}`)

  expect(ndau).toBeDefined()
})

test('getMarketPrice should return something back', async () => {
  mockFetchStuff()

  const marketPrice = await OrderNodeAPI.getMarketPrice()

  console.log(
    `getMarketPrice returns to ${JSON.stringify(marketPrice, null, 2)}`
  )

  expect(marketPrice).toBeDefined()
})

const mockFetchStuff = () => {
  fetch.resetMocks()

  fetch.mockResponses(
    // [services],
    // [data.testAddressData],
    // [services],
    // [data.eaiPercentageResponse],
    [services],
    [data.testMarketPrice]
  )
}
