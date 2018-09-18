import NodeAddressHelper from '../helpers/NodeAddressHelper';
import addressData from './addressData';

const getEAIPercentage = (user) => {
  //TODO: this is TEMP code
  if (__DEV__) {
    return addressData.eaiPercentageResponse;
  }

  const eaiPercentageAddress = NodeAddressHelper.getEaiPercentageAPIAddress(user);
  console.log(
    `eaiPercentageAddress ${JSON.stringify(user.addressData, null, 2)} to ${eaiPercentageAddress}`
  );
  return fetch(eaiPercentageAddress, {
    method: 'POST',
    headers: {
      // Authentication: `qr-token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      addressData: user.addressData
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.info(`eaiPercentageAddress responseJson ${JSON.stringify(responseJson, null, 2)}`);
      return responseJson;
    });
};

export default {
  getEAIPercentage
};
