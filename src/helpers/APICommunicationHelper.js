import BlockchainAPIError from '../errors/BlockchainAPIError'
import axios from 'axios'
import LoggingService from '../services/LoggingService'

/**
 * This method will post data to a specified URL.
 *
 * @param {string} url to post to
 * @param {string} data must be JSON.stringify data ready to be sent
 * @param {number} timeout default to 10000ms, set to desired timeout
 */
const post = async (url, data, timeout = 10000) => {
  try {
    LoggingService.debug(`Sending ${data} to ${url}`)
    const response = await axios.post(url, data, { timeout })
    LoggingService.debug(
      `${url} response: ${JSON.stringify(response.data, null, 2)}`
    )
    return response.data
  } catch (error) {
    LoggingService.debug(
      `Error from ${url} ${JSON.stringify(error.response.data)}`
    )
    throw new BlockchainAPIError(_getErrorMessage(error.response.data))
  }
}

/**
 * This method will perform a GET to a specified URL.
 *
 * @param {string} url to GET
 * @param {number} timeout default to 10000ms, set to desired timeout
 */
const get = async (url, timeout = 10000) => {
  try {
    LoggingService.debug(`Performing GET on ${url}`)
    const response = await axios.get(url, { timeout })
    LoggingService.debug(
      `${url} response: ${JSON.stringify(response.data, null, 2)}`
    )
    return response.data
  } catch (error) {
    LoggingService.debug(
      `Error from ${url} ${JSON.stringify(error.response.data)}`
    )
    throw new BlockchainAPIError(_getErrorMessage(error.response.data))
  }
}

const _getErrorMessage = data => {
  return data.err || data.msg || null
}

export default {
  post,
  get
}
