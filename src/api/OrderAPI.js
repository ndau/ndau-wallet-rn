import APIAddressHelper from '../helpers/APIAddressHelper'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LogStore from '../stores/LogStore'
import DataFormatHelper from '../helpers/DataFormatHelper'

const getMarketPrice = async user => {
  const marketPriceAPI = await APIAddressHelper.getMarketPriceAPIAddress()
  try {
    const data = await APICommunicationHelper.get(marketPriceAPI)

    const dollars = DataFormatHelper.convertNanoCentsToDollars(data.marketPrice)

    // set the marketPrice to the user to cache this value with
    // the user. The marketPrice is captured in a defaults object
    // only if dollars is truthy (not 0 mainly)
    if (user && dollars) {
      if (!user.defaults) user.defaults = {}
      user.defaults.marketPrice = dollars
    }

    return dollars
  } catch (error) {
    LogStore.log(`Something went wrong geting market price: ${JSON.stringify(error)}`)

    if (user.defaults && user.defaults.marketPrice) {
      return user.defaults.marketPrice
    }
  }

  return 0
}

export default {
  getMarketPrice
}
