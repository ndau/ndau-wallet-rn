import BlockchainAPIError from '../errors/BlockchainAPIError'
import axios from 'axios'

/**
 * This method will post data to a specified URL.
 *
 * @param {string} url to post to
 * @param {string} data must be JSON.stringify data ready to be sent
 * @param {number} timeout default to 10000ms, set to desired timeout
 */
const post = async (url, data, timeout = 10000) => {
  try {
    console.log(`Sending ${data} to ${url}`)
    const response = await axios.post(url, data, { timeout })
    console.debug(`${url} response: ${JSON.stringify(response.data, null, 2)}`)
    return response.data
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
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
    console.log(`Performing GET on ${url}`)
    const response = await axios.get(url, { timeout })
    console.debug(`${url} response: ${JSON.stringify(response.data, null, 2)}`)
    return response.data
  } catch (error) {
    console.warn(error)
    throw new BlockchainAPIError()
  }
}

export default {
  post,
  get
}
