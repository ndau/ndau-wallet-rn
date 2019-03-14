import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'

const getMarketPrice = async () => {
  const marketPriceAPI = await APIAddressHelper.getMarketPriceAPIAddress()
  try {
    const data = await APICommunicationHelper.get(marketPriceAPI)
    return data.marketPrice
  } catch (error) {
    LoggingService.debug(error)
    throw new BlockchainAPIError(error.message)
  }
}

export default {
  getMarketPrice
}
