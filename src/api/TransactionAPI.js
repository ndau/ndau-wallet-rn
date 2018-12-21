import APIAddressHelper from '../helpers/APIAddressHelper'

const prevalidate = async transaction => {
  const prevalidateAddress = await APIAddressHelper.getTransactionPrevalidateAPIAddress()

  console.log(`Sending ${JSON.stringify(transaction)} to ${prevalidateAddress}`)

  const response = await fetch(prevalidateAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  if (response.status !== 200) {
    throw new BlockchainAPIError()
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(
    `prevalidate response: ${JSON.stringify(responseBody, null, 2)}`
  )
  return responseBody
}

export default {
  prevalidate
}
