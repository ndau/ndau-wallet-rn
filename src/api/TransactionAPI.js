import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'

const _postTransaction = async (submitAddress, transaction) => {
  try {
    return await APICommunicationHelper.post(
      submitAddress,
      JSON.stringify(transaction)
    )
  } catch (error) {
    LoggingService.debug(error)
    throw new BlockchainAPIError()
  }
}

const prevalidate = async (submitAddress, transaction) => {
  return await _postTransaction(submitAddress, transaction)
}

const submit = async (submitAddress, transaction) => {
  return await _postTransaction(submitAddress, transaction)
}

const transactionByHash = async transactionHash => {
  try {
    const transactionByHashAddress = await APIAddressHelper.getTransactionByHashAPIAddress(
      transactionHash
    )
    return await APICommunicationHelper.get(transactionByHashAddress)
  } catch (error) {
    LoggingService.debug(error)
    throw new BlockchainAPIError()
  }
}

export default {
  prevalidate,
  submit,
  transactionByHash
}
