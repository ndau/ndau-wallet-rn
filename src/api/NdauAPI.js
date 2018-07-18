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
      console.error(error);
    });
};

getNumberOfAccounts = (userId) => {
  return fetch(`${ndauApiProtocol}://${ndauApiHost}/api/ndau/account/${userId}/totalnumber`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getNumberOfAccounts responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  getTargetPrice,
  getNumberOfAccounts
};
