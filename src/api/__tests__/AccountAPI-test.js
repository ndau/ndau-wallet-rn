import OrderAPI from '../OrderAPI'
import AccountAPI from '../AccountAPI'
import data from '../data'
import services from '../../api/services-dev.json'

const user = data.testUser
fetch.resetMocks()

test('getAddressData should return something back', async () => {
  fetch.mockResponses([services], [data.testAddressData])

  const ndau = await AccountAPI.getAddressData(user)

  expect(ndau).toBeDefined()
})

test('getMarketPrice should return something back', async () => {
  fetch.mockResponses([services], [data.testMarketPrice])

  const marketPrice = await OrderAPI.getMarketPrice()

  expect(marketPrice).toBeDefined()
})
