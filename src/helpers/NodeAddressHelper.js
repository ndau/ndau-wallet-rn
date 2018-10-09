const PROTOCOL = 'https';
const DOMAIN = '.ndau.io';

getNodeAddress = (selectedNode) => {
  return PROTOCOL + '://' + selectedNode.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/account';
};

getEaiPercentageAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/eaipercentage';
};

getMarketPriceAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/marketprice';
};

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiPercentageAPIAddress
};
