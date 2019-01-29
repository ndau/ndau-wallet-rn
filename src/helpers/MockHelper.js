import services from '../api/services-for-testing.json'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import data from '../api/data'

const mock = new MockAdapter(axios)

const mockServiceDiscovery = () => {
  mock
    .onGet('https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json')
    .reply(200, services)
}

const mockAccountAPI = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/account/accounts')
    .reply(200, data.testAddressData)
}

const mockMarketPriceAPI = () => {
  mock
    .onGet('https://testnet-0.api.ndau.tech/order/current')
    .reply(200, data.testMarketPrice)
}

const mockEaiRate = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/account/eai/rate')
    .reply(200, data.eaiPercentageResponse)
}

const mockClaimAccountTx = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/prevalidate/ClaimAccount')
    .reply(200, data.claimAccountTxRes)
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/submit/ClaimAccount')
    .reply(200, data.claimAccountTxRes)
}

export default {
  mockServiceDiscovery,
  mockAccountAPI,
  mockMarketPriceAPI,
  mockEaiRate,
  mockClaimAccountTx
}
