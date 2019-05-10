import ServiceDiscovery from '../ServiceDiscovery'
import MockHelper from '../../helpers/MockHelper'

describe('...testing ServiceDiscovery', () => {
  test('getBlockchainServiceNodeURL should return something back', async () => {
    MockHelper.mockServiceDiscovery()

    const serverUrl = await ServiceDiscovery.getBlockchainServiceNodeURL()

    // its testnet because that is what we pull in within MockHelper
    expect(serverUrl.includes('api.ndau.tech:31300')).toBeTruthy()
  })

  test('getRecoverServiceNodeURL should return something back', async () => {
    MockHelper.mockServiceDiscovery()

    const serverUrl = await ServiceDiscovery.getRecoveryServiceNodeURL()

    // its testnet because that is what we pull in within MockHelper
    expect(serverUrl.includes('recovery.ndau.tech')).toBeTruthy()
  })
})
