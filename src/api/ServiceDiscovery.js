import ServiceDiscoveryError from '../errors/ServiceDiscoveryError'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'
import moment from 'moment'

const AWS_S3_SERVICE_JSON =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services.json'

const cache = {
  lastChecked: moment(0), // moment date. starts a 0 to immediately invalidate the cache
  nodes: []
}

const CACHE_TTL = 1000 * 60 * 5 // 1000 * 60 * 5 = five minutes
const getServiceNodeURL = async () => {
  LoggingService.debug(`Service Discovery URL: ${AWS_S3_SERVICE_JSON}`)

  try {
    if (moment().diff(cache.lastChecked) > CACHE_TTL) {
      const response = await APICommunicationHelper.get(AWS_S3_SERVICE_JSON)
      cache.nodes = await _parseServicesForNodes(response)
      cache.lastChecked = moment()
    }

    // return a random service for use
    return cache.nodes[Math.floor(Math.random() * cache.nodes.length)]
  } catch (error) {
    LoggingService.debug(error)
    throw new ServiceDiscoveryError()
  }
}

const _parseServicesForNodes = async serviceDiscovery => {
  let nodes = []
  let environment = 'mainnet'
  if ((await AsyncStorageHelper.isTestNet()) || __DEV__) {
    LoggingService.debug('Using TestNet...')
    environment = 'testnet'
  } else {
    LoggingService.debug('Using MainNet...')
  }

  for (const node of Object.values(
    serviceDiscovery.networks[environment].nodes
  )) {
    nodes.push(node.api)
  }
  return nodes
}

export default {
  getServiceNodeURL
}
