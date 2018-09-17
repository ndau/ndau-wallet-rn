import NdauNodeAPI from '../api/NdauNodeAPI';
import DateHelper from './DateHelper';

const populateCurrentUserWithAddressData = async (user) => {
  try {
    const addressData = await NdauNodeAPI.getAddressData(user);
    user.addressData = addressData ? addressData.addressData : [];
  } catch (error) {
    console.log(error);
  }

  return user;
};

const accountLockedUntil = (account) => {
  return DateHelper.getDateFromMilliseconds(account.Lock.UnlocksOn);
};

const accountNdauAmount = (account) => {
  return account.Balance;
};

export default {
  populateCurrentUserWithAddressData,
  accountLockedUntil,
  accountNdauAmount
};
