import DataFormatHelper from '../helpers/DataFormatHelper';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';

const loadData = async (user) => {
  //Old data had addresses and nothing else. We are building the accounts from this
  //then we see if there is a match with what is on the blockchain and populate
  //the account with addressData if so
  DataFormatHelper.createAccountsFromAddresses(user);

  await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);
};

export default {
  loadData
};
