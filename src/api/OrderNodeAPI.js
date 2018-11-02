import NodeAddressHelper from '../helpers/NodeAddressHelper'
import data from './data'

const getEAIPercentage = addressData => {
  // TODO: this is TEMP code
  if (__DEV__) {
    return data.eaiPercentageResponse
  }

  const eaiPercentageAddress = NodeAddressHelper.getEaiPercentageAPIAddress()
  console.log(
    `eaiPercentageAddress ${JSON.stringify(addressData, null, 2)} to ${eaiPercentageAddress}`
  )
  return fetch(eaiPercentageAddress, {
    method: 'POST',
    headers: {
      // Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addressData: addressData
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      console.info(`eaiPercentageAddress responseJson ${JSON.stringify(responseJson, null, 2)}`)
      return responseJson
    })
}

export default {
  getEAIPercentage
}
