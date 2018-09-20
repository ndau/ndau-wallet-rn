const PROTOCOL = 'https';
const DOMAIN = '.ndau.io';

getNodeAddress = (user) => {
  return PROTOCOL + '://' + user.selectedNode.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = (user) => {
  return getNodeAddress(user) + '/account';
};

getEaiPercentageAPIAddress = (user) => {
  return getNodeAddress(user) + '/eaipercentage';
};

getMarketPriceAPIAddress = (user) => {
  return getNodeAddress(user) + '/marketprice';
};

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiPercentageAPIAddress
};
