import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'
import DataFormatHelper from '../helpers/DataFormatHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'

const getAddressData = async addresses => {
  const accountAPI = await NodeAddressHelper.getAccountAPIAddress()
  console.log(`Sending ${JSON.stringify(addresses)} to ${accountAPI}`)
  const response = await fetch(accountAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addresses)
  })
  if (response.status !== 200) {
    throw new BlockchainAPIError()
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(
    `getAddressData response: ${JSON.stringify(responseBody, null, 2)}`
  )
  return responseBody
}

const getEaiRate = async wallet => {
  const accountEaiRateRequestData = DataFormatHelper.getAccountEaiRateRequest(
    wallet
  )

  const eaiRateAddress = await NodeAddressHelper.getEaiRateAPIAddress()
  console.log(
    `Sending ${JSON.stringify(accountEaiRateRequestData)} to ${eaiRateAddress}`
  )

  const response = await fetch(eaiRateAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accountEaiRateRequestData)
  })
  if (response.status !== 200) {
    throw new BlockchainAPIError()
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(`getEaiRate response: ${JSON.stringify(responseBody, null, 2)}`)
  return responseBody
}

const getNodeStatus = async () => {
  const nodeStatusAddress = await NodeAddressHelper.getNodeStatusAPIAddress()
  const response = await fetch(nodeStatusAddress)
  if (response.status !== 200) {
    throw new BlockchainAPIError()
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.info(
    `nodeStatusAddress responseJson ${JSON.stringify(responseJson, null, 2)}`
  )
  return responseBody
}

export default {
  getAddressData,
  getEaiRate,
  getNodeStatus
}
