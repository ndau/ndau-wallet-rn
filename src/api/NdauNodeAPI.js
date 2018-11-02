import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'

const getAddressData = addresses => {
  // TODO: this is TEMP code
  if (__DEV__) {
    return data.testAddressData
  }

  const accountAPI = NodeAddressHelper.getAccountAPIAddress()
  console.log(`Sending ${JSON.stringify(addresses, null, 2)} to ${accountAPI}`)
  return fetch(accountAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addresses: addresses
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      console.info(`getAddressData responseJson ${JSON.stringify(responseJson, null, 2)}`)
      return responseJson
    })
}

const getMarketPrice = () => {
  // TODO: this is TEMP code
  if (__DEV__) {
    return data.testMarketPrice
  }

  const marketPriceAPI = NodeAddressHelper.getMarketPriceAPIAddress()
  return fetch(marketPriceAPI).then(response => response.json()).then(responseJson => {
    console.info(`getMarketPrice responseJson ${JSON.stringify(responseJson, null, 2)}`)
    return responseJson
  })
}

const getNodeStatus = () => {
  // TODO: this is TEMP code
  if (__DEV__) {
    return data.nodeStatus
  }

  const nodeStatusAddress = NodeAddressHelper.getNodeStatusAPIAddress()
  return fetch(nodeStatusAddress).then(response => response.json()).then(responseJson => {
    console.info(`nodeStatusAddress responseJson ${JSON.stringify(responseJson, null, 2)}`)
    return responseJson
  })
}

export default {
  getAddressData,
  getMarketPrice,
  getNodeStatus
}
