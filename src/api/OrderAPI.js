import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'

const getMarketPrice = async user => {
  const marketPriceAPI = await APIAddressHelper.getMarketPriceAPIAddress()
  try {
    const data = await APICommunicationHelper.get(marketPriceAPI)

    // set the marketPrice to the user to cache this value with
    // the user. The marketPrice is captured in a defaults object
    if (user) {
      if (!user.defaults) user.defaults = {}
      user.defaults.marketPrice = data.marketPrice
    }

    return data.marketPrice
  } catch (error) {
    LoggingService.debug(error)
    return user.marketPrice
    throw new BlockchainAPIError(error.message)
  }
}

export default {
  getMarketPrice
}
