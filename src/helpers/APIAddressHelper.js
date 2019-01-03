import AppConfig from '../AppConfig'
import ServiceDiscovery from '../api/ServiceDiscovery'

const PROTOCOL = 'https'

const getNode = async () => {
  return await ServiceDiscovery.getServiceNodeURL()
}

const getNodeAddress = async () => {
  const node = await getNode()
  return PROTOCOL + '://' + node
}

const getAccountAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/accounts'
}

const getEaiRateAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/eai/rate'
}

const getMarketPriceAPIAddress = async () => {
  return (await getNodeAddress()) + '/order/current'
}

const getNodeStatusAPIAddress = async () => {
  return (await getNodeAddress()) + '/node/status'
}

const getTransactionPrevalidateAPIAddress = async () => {
  return (await getNodeAddress()) + '/tx/prevalidate'
}

const getTransactionSubmitAPIAddress = async () => {
  return (await getNodeAddress()) + '/tx/submit'
}

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiRateAPIAddress,
  getNodeStatusAPIAddress,
  getTransactionPrevalidateAPIAddress,
  getTransactionSubmitAPIAddress
}
