import NodeAddressHelper from '../helpers/NodeAddressHelper';
import addressData from './addressData';

const getAddressData = (selectedNode, addresses) => {
  //TODO: this is TEMP code
  if (__DEV__) {
    return addressData.testAddressData;
  }

  const accountAPI = NodeAddressHelper.getAccountAPIAddress(selectedNode);
  console.log(`Sending ${JSON.stringify(addresses, null, 2)} to ${accountAPI}`);
  return fetch(accountAPI, {
    method: 'POST',
    headers: {
      // Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addresses: addresses
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`getAddressData responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

const getMarketPrice = (selectedNode) => {
  //TODO: this is TEMP code
  if (__DEV__) {
    return addressData.testMarketPrice;
  }

  const marketPriceAPI = NodeAddressHelper.getMarketPriceAPIAddress(selectedNode);
  return fetch(marketPriceAPI).then((response) => response.json()).then((responseJson) => {
    console.info(`getMarketPrice responseJson ${JSON.stringify(responseJson, null, 2)}`);
    return responseJson;
  });
};

export default {
  getAddressData,
  getMarketPrice
};
