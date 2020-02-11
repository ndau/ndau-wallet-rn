/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import ServiceDiscoveryError from '../errors/ServiceDiscoveryError'
import AsyncStorageHelper from '../model/AsyncStorageHelper'
import APICommunicationHelper from '../helpers/APICommunicationHelper'
import LogStore from '../stores/LogStore'
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
  LogStore.log(`Blockchain Service Discovery URL: ${AWS_S3_SERVICE_JSON}`)

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
    LogStore.log(error)
    throw new ServiceDiscoveryError()
  }
}

const getRecoveryServiceNodeURL = async () => {
  LogStore.log(`Recovery Service Discovery URL: ${AWS_S3_SERVICE_JSON}`)

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
    LogStore.log(error)
    throw new ServiceDiscoveryError()
  }
}

const invalidateCache = () => {
  blockchainCache.lastChecked = moment(0)
  recoveryCache.lastChecked = moment(0)
}

const _parseServicesForNodes = async (serviceDiscovery, type) => {
  let nodes = []
  let environment = await AsyncStorageHelper.getNetwork()
  // if we are in simulators then force to testnet
  if (__DEV__) {
    await AsyncStorageHelper.useTestNet()
    environment = await AsyncStorageHelper.getNetwork()
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
  getRecoveryServiceNodeURL,
  invalidateCache
}
