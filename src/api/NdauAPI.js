const ndauApiHost = 'ndaudashboard.ndau.tech';
const ndauApiProtocol = 'https';

getTargetPrice = () => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/targetprice`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getTargetPrice responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    })
    .catch((error) => {
      throw error;
    });
};

getNumberOfAccounts = (userId) => {
  console.log(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/account/${userId}/totalnumber`)
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/account/${userId}/totalnumber`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getNumberOfAccounts responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

getNdauNewsLinks = () => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/news`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getNdauNewsLinks responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

sendAccountAddresses = (userId, addresses, token) => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/accountAddress`, {
    method: 'POST',
    headers: {
      Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      addresses: addresses
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`sendAccountAddresses responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

triggerQRTEmail = (userId) => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/emailauth/qr-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`sendAccountAddresses responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

module.exports = {
  getTargetPrice,
  getNumberOfAccounts,
  sendAccountAddresses,
  getNdauNewsLinks,
  triggerQRTEmail
};
