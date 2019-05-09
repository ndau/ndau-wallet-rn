import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'

const _postTransaction = async (submitAddress, transaction) => {
  LoggingService.debug(
    'TransactionAPI._postTransaction',
    submitAddress,
    transaction
  )
  try {
    return await APICommunicationHelper.post(
      submitAddress,
      JSON.stringify(transaction)
    )
  } catch (error) {
    LoggingService.error('TransactionAPI._postTransaction', error)
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
  LoggingService.debug('TransactionAPI.transactionByHash', transactionHash)
  try {
    const transactionByHashAddress = await APIAddressHelper.getTransactionByHashAPIAddress(
      transactionHash
    )
    return await APICommunicationHelper.get(transactionByHashAddress)
  } catch (error) {
    LoggingService.error('TransactionAPI.transactionByHash', error)
    throw new BlockchainAPIError(error)
  }
}

export default {
  prevalidate,
  submit,
  transactionByHash
}
