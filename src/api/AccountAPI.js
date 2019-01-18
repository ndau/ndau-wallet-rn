import APIAddressHelper from '../helpers/APIAddressHelper'
import DataFormatHelper from '../helpers/DataFormatHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'

const getAddressData = async addresses => {
  const accountAPI = await APIAddressHelper.getAccountAPIAddress()
  try {
    return APICommunicationHelper.post(accountAPI, JSON.stringify(addresses))
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

const getEaiRate = async addressData => {
  const accountEaiRateRequestData = DataFormatHelper.getAccountEaiRateRequest(
    addressData
  )

  const eaiRateAddress = await APIAddressHelper.getEaiRateAPIAddress()
  try {
    return APICommunicationHelper.post(
      eaiRateAddress,
      JSON.stringify(accountEaiRateRequestData)
    )
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

export default {
  getAddressData,
  getEaiRate
}
