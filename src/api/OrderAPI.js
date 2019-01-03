import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import data from './data'

const getMarketPrice = async () => {
  const marketPriceAPI = await APIAddressHelper.getMarketPriceAPIAddress()
  const response = await fetch(marketPriceAPI)
  if (response.status !== 200) {
    throw new BlockchainAPIError()
  }
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
