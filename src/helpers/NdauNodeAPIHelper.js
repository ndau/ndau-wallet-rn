import NdauNodeAPI from '../api/NdauNodeAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import User from '../model/User';

const populateCurrentUserWithAddressData = async (user) => {
  try {
    const addressData = await NdauNodeAPI.getAddressData(user);
    user.addressData = addressData ? addressData.addressData : [];
  } catch (error) {
    console.log(error);
  }

  // let user = await AsyncStorageHelper.getCurrentUser();

  AsyncStorageHelper.setCurrentUser(user);
  return user;
};

export default {
  populateCurrentUserWithAddressData
};
