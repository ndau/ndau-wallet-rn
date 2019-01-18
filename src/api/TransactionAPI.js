import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'

const prevalidate = async (submitAddress, transaction) => {
  console.log(`Sending ${JSON.stringify(transaction)} to ${submitAddress}`)

  const response = await fetch(submitAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  if (response.status !== 200) {
    const body = await response.json()
    throw new BlockchainAPIError(body.err)
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

const submit = async (submitAddress, transaction) => {
  console.log(`Sending ${JSON.stringify(transaction)} to ${submitAddress}`)

  const response = await fetch(submitAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  if (response.status !== 200) {
    const body = await response.json()
    throw new BlockchainAPIError(body.err)
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(`submit response: ${JSON.stringify(responseBody, null, 2)}`)
  return responseBody
}

export default {
  prevalidate,
  submit
}
