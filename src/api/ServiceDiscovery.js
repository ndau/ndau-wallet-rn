import ServiceDiscoveryError from '../errors/ServiceDiscoveryError'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LoggingService from '../services/LoggingService'
import moment from 'moment'
import APIAddressHelper from '../helpers/APIAddressHelper'

const AWS_S3_SERVICE_JSON =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services.json'

const CACHE_TTL = 1000 * 60 * 5 // 1000 * 60 * 5 = five minutes

const blockchainCache = {
  lastChecked: moment(0), // moment date. starts a 0 to immediately invalidate the cache
  nodes: []
}

const recoveryCache = {
  lastChecked: moment(0), // moment date. starts a 0 to immediately invalidate the cache
  nodes: []
}

const getBlockchainServiceNodeURL = async () => {
  LoggingService.debug(
    `Blockchain Service Discovery URL: ${AWS_S3_SERVICE_JSON}`
  )

  try {
    if (moment().diff(blockchainCache.lastChecked) > CACHE_TTL) {
      const response = await APICommunicationHelper.get(AWS_S3_SERVICE_JSON)
      blockchainCache.nodes = await _parseServicesForNodes(response)
      blockchainCache.lastChecked = moment()
    }

    // return a random service for use
    return blockchainCache.nodes[
      Math.floor(Math.random() * blockchainCache.nodes.length)
    ]
  } catch (error) {
    LoggingService.debug(error)
    throw new ServiceDiscoveryError()
  }
}

const getRecoveryServiceNodeURL = async () => {
  LoggingService.debug(`Recovery Service Discovery URL: ${AWS_S3_SERVICE_JSON}`)

  try {
    if (moment().diff(recoveryCache.lastChecked) > CACHE_TTL) {
      const response = await APICommunicationHelper.get(AWS_S3_SERVICE_JSON)
      recoveryCache.nodes = await _parseServicesForNodes(
        response,
        APIAddressHelper.RECOVERY
      )
      recoveryCache.lastChecked = moment()
    }

    // return a random service for use
    return recoveryCache.nodes[
      Math.floor(Math.random() * recoveryCache.nodes.length)
    ]
  } catch (error) {
    LoggingService.debug(error)
    throw new ServiceDiscoveryError()
  }
}

const _parseServicesForNodes = async (serviceDiscovery, type) => {
  let nodes = []
  let environment = 'mainnet'
  if ((await AsyncStorageHelper.isTestNet()) || __DEV__) {
    LoggingService.debug('Using TestNet...')
    environment = 'testnet'
  } else {
    LoggingService.debug('Using MainNet...')
  }

  if (type === APIAddressHelper.RECOVERY) {
    for (const node of Object.values(
      serviceDiscovery.recovery[environment].nodes
    )) {
      nodes.push(node.api)
    }
  } else {
    for (const node of Object.values(
      serviceDiscovery.networks[environment].nodes
    )) {
      nodes.push(node.api)
    }
  }
  return nodes
}

export default {
  getBlockchainServiceNodeURL,
  getRecoveryServiceNodeURL
}
