import APIAddressHelper from '../helpers/APIAddressHelper'
import DataFormatHelper from '../helpers/DataFormatHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import AsyncStorageHelper from '../model/AsyncStorageHelper'

var _ = require('lodash')

const getAddressData = async addresses => {
  const accountAPI = await APIAddressHelper.getAccountAPIAddress()
  try {
    const accountData = await APICommunicationHelper.post(
      accountAPI,
      JSON.stringify(addresses)
    )
    await AsyncStorageHelper.setLastAccountData(accountData)
    return accountData
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

const isAddressDataNew = async addresses => {
  const accountAPI = await APIAddressHelper.getAccountAPIAddress()
  try {
    const lastAccountData = await AsyncStorageHelper.getLastAccountData()
    const accountData = await APICommunicationHelper.post(
      accountAPI,
      JSON.stringify(addresses)
    )
    return !_.isEqual(lastAccountData, accountData)
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
    return await APICommunicationHelper.post(
      eaiRateAddress,
      JSON.stringify(accountEaiRateRequestData)
    )
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

const accountHistory = async address => {
  const accountHistoryAddress = await APIAddressHelper.getAccountHistoryAPIAddress(
    address
  )
  try {
    return await APICommunicationHelper.get(accountHistoryAddress)
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

export default {
  getAddressData,
  getEaiRate,
  accountHistory,
  isAddressDataNew
}
