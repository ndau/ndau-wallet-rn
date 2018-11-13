import AppConfig from '../AppConfig'
import ServiceDiscovery from '../api/ServiceDiscovery'

const PROTOCOL = 'https'

getNode = async () => {
  return await ServiceDiscovery.getServiceNodeURL()
}

getNodeAddress = async () => {
  const node = await getNode()
  return PROTOCOL + '://' + node
}

getAccountAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/accounts'
}

getEaiRateAPIAddress = async () => {
  return (await getNodeAddress()) + '/account/eai/rate'
}

getMarketPriceAPIAddress = async () => {
  return (await getNodeAddress()) + '/order/current'
}

getNodeStatusAPIAddress = async () => {
  return (await getNodeAddress()) + '/node/status'
}

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiRateAPIAddress,
  getNodeStatusAPIAddress
}
