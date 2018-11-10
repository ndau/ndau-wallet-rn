const AWS_S3_SERVICE_JSON =
  'https://s3.us-east-2.amazonaws.com/ndau-json/services.json'

const getServiceNodeURL = async () => {
  try {
    const response = await fetch(AWS_S3_SERVICE_JSON)
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
  } catch (error) {
    console.error(error)
  }
}

export default {
  getServiceNodeURL
}
