import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';

const loadData = async (user) => {
  //TODO: THIS MUST CHANAGE as we can't assume this format!
  const wallet = user.wallets[user.userId];
  await NdauNodeAPIHelper.populateWalletWithAddressData(wallet);
};

export default {
  loadData
};
