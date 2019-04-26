import ServiceDiscoveryError from '../errors/ServiceDiscoveryError'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'
import moment from 'moment'

const AWS_S3_SERVICE_JSON_PROD =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-prod.json'
const AWS_S3_SERVICE_JSON_TEST =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json'
const AWS_S3_SERVICE_JSON_DEV =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-dev.json'

const cache = {
  lastChecked: moment(0), // moment date. starts a 0 to immediately invalidate the cache
  nodes: []
}

const CACHE_TTL = 1000 * 60 * 5 // 1000 * 60 * 5 = five minutes
const getServiceNodeURL = async () => {
  let url = AWS_S3_SERVICE_JSON_PROD
  if ((await AsyncStorageHelper.isTestNet()) || __DEV__) {
    url = AWS_S3_SERVICE_JSON_TEST
  }
  LoggingService.debug(`Service Discovery URL: ${url}`)

  try {
    if ( moment().diff(cache.lastChecked) > CACHE_TTL ) {
      const response = await APICommunicationHelper.get(url)
      cache.nodes = response.apinodes
      cache.lastChecked = moment()
    }

    // return a random service for use
    return cache.nodes[Math.floor(Math.random() * cache.nodes.length)]
  } catch (error) {
    LoggingService.debug(error)
    throw new ServiceDiscoveryError()
  }
}

export default {
  getServiceNodeURL
}
