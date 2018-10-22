import AppConfig from '../AppConfig';

const PROTOCOL = 'https';
const DOMAIN = '.api.ndau.tech';
// const SELECTED_NODE = AppConfig.NODE_NAMES[Math.floor(Math.random() * AppConfig.NODE_NAMES.length)];
//TODO: THIS SHOULD NOT BE HARDCODED BUT IS FOR NOW
const SELECTED_NODE = 'testgroup-0';

getNodeAddress = (selectedNode) => {
  const node = selectedNode || SELECTED_NODE;
  return PROTOCOL + '://' + node.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/accounts';
};

getEaiPercentageAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/eaipercentage';
};

getMarketPriceAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/marketprice';
};

getNodeStatusAPIAddress = (selectedNode) => {
  return getNodeAddress(selectedNode) + '/node/status';
};

export default {
  getAccountAPIAddress,
  getMarketPriceAPIAddress,
  getEaiPercentageAPIAddress,
  getNodeStatusAPIAddress
};
