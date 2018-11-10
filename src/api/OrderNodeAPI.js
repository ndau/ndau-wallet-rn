import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'

const getEAIPercentage = async addressData => {
  // TODO: this is TEMP code
  // if (__DEV__) {
  return data.eaiPercentageResponse
  // }

  const eaiPercentageAddress = await NodeAddressHelper.getEaiPercentageAPIAddress()
  console.log(
    `eaiPercentageAddress ${JSON.stringify(addressData, null, 2)} to ${eaiPercentageAddress}`
  )
  return fetch(eaiPercentageAddress, {
    method: 'POST',
    headers: {
      // Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addressData: addressData
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      console.info(
        `eaiPercentageAddress responseJson ${JSON.stringify(responseJson, null, 2)}`
      )
      return responseJson
    })
}

const getMarketPrice = async () => {
  const marketPriceAPI = await NodeAddressHelper.getMarketPriceAPIAddress()
  const response = await fetch(marketPriceAPI)
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(
    `getMarketPrice response: ${JSON.stringify(responseBody, null, 2)}`
  )
  return responseBody.marketPrice
}

export default {
  getEAIPercentage,
  getMarketPrice
}
