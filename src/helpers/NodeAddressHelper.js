import AppConfig from '../AppConfig'

const PROTOCOL = 'https'

getNode = () => {
  return ServiceDiscovery
}

getNodeAddress = () => {
  return PROTOCOL + '://' + getNode() + DOMAIN
}

getAccountAPIAddress = () => {
  return getNodeAddress() + '/accounts'
}

getEaiPercentageAPIAddress = () => {
  return getNodeAddress() + '/eaipercentage'
}

getMarketPriceAPIAddress = () => {
  return getNodeAddress() + '/marketprice'
}

getNodeStatusAPIAddress = () => {
  return getNodeAddress() + '/node/status'
}

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiPercentageAPIAddress,
  getNodeStatusAPIAddress,
  SELECTED_NODE
}
