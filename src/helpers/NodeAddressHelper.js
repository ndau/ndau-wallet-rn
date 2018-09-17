import AsyncStorageHelper from '../model/AsyncStorageHelper';

const PROTOCOL = 'https';
const DOMAIN = '.ndau.io';

getNodeAddress = async () => {
  const user = await AsyncStorageHelper.getCurrentUser();

  return PROTOCOL + '://' + user.selectedNode.toLowerCase() + DOMAIN;
};

getAccountAPIAddress = async () => {
  return (await getNodeAddress()) + '/account';
};

export default {
  getAccountAPIAddress
};
