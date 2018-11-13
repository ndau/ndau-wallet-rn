import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'
import DataFormatHelper from '../helpers/DataFormatHelper'

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
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(`getEaiRate response: ${JSON.stringify(responseBody, null, 2)}`)
  return responseBody
}

const getNodeStatus = async () => {
  const nodeStatusAddress = await NodeAddressHelper.getNodeStatusAPIAddress()
  return fetch(nodeStatusAddress)
    .then(response => response.json())
    .then(responseJson => {
      console.info(
        `nodeStatusAddress responseJson ${JSON.stringify(responseJson, null, 2)}`
      )
      return responseJson
    })
}

export default {
  getAddressData,
  getEaiRate,
  getNodeStatus
}
