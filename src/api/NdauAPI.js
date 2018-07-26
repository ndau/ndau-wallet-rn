//TODO: Replace this with a configuration file solution
//TODO: Realm might work well or react-native-keychain
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

sendAccountAddresses = (userId, addresses) => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/accountAddress`, {
    method: 'POST',
    headers: {
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

module.exports = {
  getTargetPrice,
  getNumberOfAccounts,
  sendAccountAddresses,
  getNdauNewsLinks
};
