import ServiceDiscoveryError from '../errors/ServiceDiscoveryError'
import AsyncStorageHelper from '../model/AsyncStorageHelper'

const AWS_S3_SERVICE_JSON_PROD =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-prod.json'
const AWS_S3_SERVICE_JSON_TEST =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json'
const AWS_S3_SERVICE_JSON_DEV =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services-dev.json'

const getServiceNodeURL = async () => {
  let url = AWS_S3_SERVICE_JSON_PROD
  if (await AsyncStorageHelper.isTestNet()) {
    url = AWS_S3_SERVICE_JSON_TEST
  }
  console.debug(`Service Discovery URL: ${url}`)

  const response = await fetch(url)
  if (response.status !== 200) {
    throw new ServiceDiscoveryError()
  }
  let responseBody = response.body
  if (!responseBody) {
    responseBody = await response.json()
  }
  console.debug(
    `ServiceDiscovery response: ${JSON.stringify(responseBody, null, 2)}`
  )
  const apinodes = responseBody.apinodes

  // return a random service for use
  return apinodes[Math.floor(Math.random() * apinodes.length)]
}

export default {
  getServiceNodeURL
}
