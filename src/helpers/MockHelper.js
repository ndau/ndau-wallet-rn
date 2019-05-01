import services from '../api/services-for-testing.json'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import data from '../api/data'

const mock = new MockAdapter(axios)

const mockReset = () => {
  mock.reset()
}

const mockServiceDiscovery = () => {
  mock
    .onGet('https://s3.us-east-2.amazonaws.com/ndau-json/services.json')
    .reply(200, services)
}

const mockAccountsAPI = (testAddressData = data.testAddressData) => {
  mock
    .onPost('https://api.ndau.tech:31300/account/accounts')
    .reply(200, testAddressData)
}

const mockAccountsAPIReplyOnce = (testAddressData = []) => {
  mock
    .onPost('https://api.ndau.tech:31300/account/accounts')
    .replyOnce(200, testAddressData)
}

const mockAccountAPI = (
  testSingleAddressData = data.testSingleAddressData,
  address = 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacb'
) => {
  mock
    .onGet('https://api.ndau.tech:31300/account/account/' + address)
    .reply(200, testSingleAddressData)
}

const mockMarketPriceAPI = () => {
  mock
    .onGet('https://api.ndau.tech:31300/price/current')
    .reply(200, data.testMarketPrice)
}

const mockEaiRate = () => {
  mock
    .onPost('https://api.ndau.tech:31300/account/eai/rate')
    .reply(200, data.eaiValueForDisplayResponse)
}

const mockSetValidationTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/SetValidation')
    .reply(200, data.setValidationTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/SetValidation')
    .reply(200, data.setValidationTxRes)
}

const mockLockTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/Lock')
    .reply(200, data.lockTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/Lock')
    .reply(200, data.lockTxRes)
}

const mockNotifyTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/Notify')
    .reply(200, data.notifyTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/Notify')
    .reply(200, data.notifyTxRes)
}

const mockTransferTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/Transfer')
    .reply(200, data.transferTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/Transfer')
    .reply(200, data.transferTxRes)
}

const mockDelegateTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/Delegate')
    .reply(200, data.delegateTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/Delegate')
    .reply(200, data.delegateTxRes)
}

const mockSetRewardsDestinationTx = () => {
  mock
    .onPost('https://api.ndau.tech:31300/tx/prevalidate/SetRewardsDestination')
    .reply(200, data.setRewardsDestinationTxRes)
  mock
    .onPost('https://api.ndau.tech:31300/tx/submit/SetRewardsDestination')
    .reply(200, data.setRewardsDestinationTxRes)
}

const mockAccountHistory = address => {
  mock
    .onGet(`https://api.ndau.tech:31300/account/history/${address}`)
    .reply(200, data.accountHistoryRes)
}

const mockTransactionByHash = transactionHash => {
  mock
    .onGet(`https://api.ndau.tech:31300/transaction/${transactionHash}`)
    .reply(200, data.transactionByHashRes)
}

export default {
  mockServiceDiscovery,
  mockAccountsAPI,
  mockMarketPriceAPI,
  mockEaiRate,
  mockSetValidationTx,
  mockLockTx,
  mockNotifyTx,
  mockTransferTx,
  mockAccountHistory,
  mockTransactionByHash,
  mockDelegateTx,
  mockAccountAPI,
  mockReset,
  mockAccountsAPIReplyOnce,
  mockSetRewardsDestinationTx
}
