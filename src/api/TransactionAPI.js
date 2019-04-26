import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'

const _postTransaction = async (submitAddress, transaction) => {
  LoggingService.debug('TransactionAPI _postTransaction', error)
  try {
    return await APICommunicationHelper.post(
      submitAddress,
      JSON.stringify(transaction)
    )
  } catch (error) {
    LoggingService.error('TransactionAPI _postTransaction', error)
    throw error
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
    throw new BlockchainAPIError(error.message)
  }
}

export default {
  prevalidate,
  submit,
  transactionByHash
}
