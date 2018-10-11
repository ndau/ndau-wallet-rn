import AppConfig from '../AppConfig';

const PROTOCOL = 'https';
const DOMAIN = '.api.ndau.tech';
const SELECTED_NODE = AppConfig.NODE_NAMES[Math.floor(Math.random() * AppConfig.NODE_NAMES.length)];

getNodeAddress = (selectedNode) => {
  const node = selectedNode || SELECTED_NODE;
  return PROTOCOL + '://' + node.toLowerCase() + DOMAIN;
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
