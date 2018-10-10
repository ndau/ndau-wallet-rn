const PROTOCOL = 'https';
const DOMAIN = '.api.ndau.tech';

getNodeAddress = (selectedNode) => {
  return PROTOCOL + '://' + selectedNode.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = (selectedNode) => {
  return getNodeAddress('testgroup-0') + '/accounts';
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
