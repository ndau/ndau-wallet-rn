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

const mockAccountAPI = (testAddressData = data.testAddressData) => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/account/accounts')
    .reply(200, testAddressData)
}

const mockMarketPriceAPI = () => {
  mock
    .onGet('https://testnet-0.api.ndau.tech/order/current')
    .reply(200, data.testMarketPrice)
}

const mockEaiRate = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/account/eai/rate')
    .reply(200, data.eaiValueForDisplayResponse)
}

const mockClaimAccountTx = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/prevalidate/ClaimAccount')
    .reply(200, data.claimAccountTxRes)
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/submit/ClaimAccount')
    .reply(200, data.claimAccountTxRes)
}

const mockLockTx = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/prevalidate/Lock')
    .reply(200, data.lockTxRes)
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/submit/Lock')
    .reply(200, data.lockTxRes)
}

const mockNotifyTx = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/prevalidate/Notify')
    .reply(200, data.notifyTxRes)
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/submit/Notify')
    .reply(200, data.notifyTxRes)
}

const mockTransferTx = () => {
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/prevalidate/Transfer')
    .reply(200, data.transferTxRes)
  mock
    .onPost('https://testnet-0.api.ndau.tech/tx/submit/Transfer')
    .reply(200, data.transferTxRes)
}

const mockAccountHistory = address => {
  mock
    .onGet(`https://testnet-0.api.ndau.tech/account/history/${address}`)
    .reply(200, data.accountHistoryRes)
}

const mockTransactionByHash = transactionHash => {
  mock
    .onGet(`https://testnet-0.api.ndau.tech/transaction/${transactionHash}`)
    .reply(200, data.transactionByHashRes)
}

export default {
  mockServiceDiscovery,
  mockAccountAPI,
  mockMarketPriceAPI,
  mockEaiRate,
  mockClaimAccountTx,
  mockLockTx,
  mockNotifyTx,
  mockTransferTx,
  mockAccountHistory,
  mockTransactionByHash
}
