const PROTOCOL = 'https';
const DOMAIN = '.ndau.io';

getNodeAddress = (user) => {
  return PROTOCOL + '://' + user.selectedNode.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = (user) => {
  return getNodeAddress(user) + '/account';
};

export default {
  getAccountAPIAddress
};
