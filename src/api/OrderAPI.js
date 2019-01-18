import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'

const getMarketPrice = async () => {
  const marketPriceAPI = await APIAddressHelper.getMarketPriceAPIAddress()
  try {
    return APICommunicationHelper.get(marketPriceAPI)
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

export default {
  getMarketPrice
}
