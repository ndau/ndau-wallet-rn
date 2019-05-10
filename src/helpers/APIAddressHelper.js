import AppConfig from '../AppConfig'
import ServiceDiscovery from '../api/ServiceDiscovery'
import LoggingService from '../services/LoggingService'

const BLOCKCHAIN = 1
const RECOVERY = 2

const PROTOCOL = 'https'

const getBlockchainNode = async () => {
  return await ServiceDiscovery.getBlockchainServiceNodeURL()
}

const getRecoveryNode = async () => {
  const node = await ServiceDiscovery.getRecoveryServiceNodeURL()
  LoggingService.debug(`Using Recovery Service node: ${node}`)
  return node
}

const getNodeAddress = async type => {
  const node =
    type === RECOVERY ? await getRecoveryNode() : await getBlockchainNode()
  return PROTOCOL + '://' + node
}

const getAccountsAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/accounts'
}

const getAccountAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/account'
}

const getEaiRateAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/eai/rate'
}

const getMarketPriceAPIAddress = async () => {
  return (await getNodeAddress()) + '/price/current'
}

const getTransactionPrevalidateAPIAddress = async sendType => {
  return (await getNodeAddress(sendType)) + '/tx/prevalidate'
}

const getTransactionSubmitAPIAddress = async sendType => {
  LoggingService.debug(`TEST sendType is:`, sendType)
  const addressPre = await getNodeAddress(sendType)
  LoggingService.debug(`TEST addressPre:`, addressPre)
  return addressPre + '/tx/submit'
}

const getAccountHistoryAPIAddress = async address => {
  return (await getNodeAddress()) + `/account/history/${address}`
}

const getTransactionByHashAPIAddress = async transactionHash => {
  // transaction hash's can contain characters that must be encoded
  // for a URI
  const urlEncodedTransactionHash = encodeURIComponent(transactionHash)
  return (await getNodeAddress()) + `/transaction/${urlEncodedTransactionHash}`
}

export default {
  getAccountAPIAddress,
  getAccountsAPIAddress,
  getMarketPriceAPIAddress,
  getEaiRateAPIAddress,
  getTransactionPrevalidateAPIAddress,
  getTransactionSubmitAPIAddress,
  getAccountHistoryAPIAddress,
  getTransactionByHashAPIAddress,
  BLOCKCHAIN,
  RECOVERY
}
