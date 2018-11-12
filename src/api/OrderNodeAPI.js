import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'

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
  getMarketPrice
}
