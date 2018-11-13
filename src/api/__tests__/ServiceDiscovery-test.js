import ServiceDiscovery from '../ServiceDiscovery'
import services from '../services-dev.json'

describe('...testing ServiceDiscovery', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('getServiceNodeURL should return something back', async () => {
    fetch.mockResponseOnce(services)

    const serverUrl = await ServiceDiscovery.getServiceNodeURL()

    expect(serverUrl).toBeDefined()
    expect(serverUrl.indexOf('devnet'))
  })
})
