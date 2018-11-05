import AppConfig from '../AppConfig'

const PROTOCOL = 'https'
const DOMAIN = '.api.ndau.tech'
// TODO: THIS SHOULD NOT BE HARDCODED BUT IS FOR NOW
const SELECTED_NODE = 'testnet-0'

getNode = () => {
  return SELECTED_NODE
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
