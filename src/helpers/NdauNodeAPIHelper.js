import NdauNodeAPI from '../api/NdauNodeAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import User from '../model/User';

const populateCurrentUserWithAddressData = async () => {
  const addressData = await NdauNodeAPI.getAddressData();

  let user = await AsyncStorageHelper.getCurrentUser();
  user.addressData = addressData.addressData;

  AsyncStorageHelper.setCurrentUser(user);
};

export default {
  populateCurrentUserWithAddressData
};
