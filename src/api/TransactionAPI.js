import APIAddressHelper from '../helpers/APIAddressHelper'
import BlockchainAPIError from '../errors/BlockchainAPIError'

const prevalidate = async transaction => {
  const submitAddress = await APIAddressHelper.getTransactionPrevalidateAPIAddress()

  const dataToSend = { data: transaction }
  console.log(`Sending ${JSON.stringify(dataToSend)} to ${submitAddress}`)

  const response = await fetch(submitAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  if (response.status !== 200) {
    const body = await response.json()
    throw new BlockchainAPIError(body.msg)
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

const submit = async transaction => {
  const submitAddress = await APIAddressHelper.getTransactionSubmitAPIAddress()

  const dataToSend = { data: transaction }
  console.log(`Sending ${JSON.stringify(dataToSend)} to ${submitAddress}`)

  const response = await fetch(submitAddress, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  if (response.status !== 200) {
    const body = await response.json()
    throw new BlockchainAPIError(body.msg)
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
