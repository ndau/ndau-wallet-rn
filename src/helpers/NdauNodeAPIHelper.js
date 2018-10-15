import NdauNodeAPI from '../api/NdauNodeAPI';
import DateHelper from './DateHelper';
import AppConfig from '../AppConfig';
import OrderNodeAPI from '../api/OrderNodeAPI';

const populateCurrentUserWithAddressData = async (user) => {
  try {
    const addressDataFromAPI = await NdauNodeAPI.getAddressData(user.selectedNode, user.addresses);
    const marketPriceFromAPI = await NdauNodeAPI.getMarketPrice(user.selectedNode);
    const eaiPercentageData = await OrderNodeAPI.getEAIPercentage(user.selectedNode);
    const addressData = addressDataFromAPI ? addressDataFromAPI.addressData : [];
    const marketPrice = marketPriceFromAPI ? marketPriceFromAPI.marketPrice : {};
    const totalNdau = accountTotalNdauAmount(addressData, false);
    console.log(`marketPrice is ${marketPrice} totalNdau is ${totalNdau}`);

    user.addressData = addressData;
    //why not use .toLocaleString you ask...here is why:
    //https://github.com/facebook/react-native/issues/15717
    user.currentPrice = marketPrice
      ? '$' +
        parseFloat(totalNdau * marketPrice)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '$0.00';
    console.log(`currentPrice: ${user.currentPrice}`);

    const eaiPercentageMap = new Map();
    eaiPercentageData.forEach((account) => {
      eaiPercentageMap.set(account.address, account.eaiPercentage);
    });

    const addressNicknameMap = new Map();

    //create a map to create the nickname fields appropriately
    user.addressData.forEach((account, index) => {
      account.nickname = `Account ${index + 1}`;
      account.eaiPercentage = eaiPercentageMap.get(account.address);
      addressNicknameMap.set(account.address, account.nickname);
    });

    //now iterate using the map to populate the rewardsTargetNickname
    //and incomingRewardsFromNickname
    user.addressData.forEach((account) => {
      if (account.rewardsTarget) {
        account.rewardsTargetNickname = addressNicknameMap.get(account.rewardsTarget);
      }

      if (account.incomingRewardsFrom) {
        account.incomingRewardsFromNickname = addressNicknameMap.get(account.incomingRewardsFrom);
      }
    });
  } catch (error) {
    console.log(error);
  }

  return user;
};

const eaiPercentage = (account) => {
  return account.eaiPercentage ? account.eaiPercentage : null;
};

const receivingEAIFrom = (account) => {
  return account.incomingRewardsFromNickname ? account.incomingRewardsFromNickname : null;
};

const sendingEAITo = (account) => {
  return account.rewardsTargetNickname ? account.rewardsTargetNickname : null;
};

const accountNickname = (account) => {
  return account.nickname;
};

const accountLockedUntil = (account) => {
  const unlocksOn = account.lock ? account.lock.unlocksOn : null;
  if (unlocksOn) {
    return DateHelper.getDateFromMilliseconds(account.lock.unlocksOn);
  }

  return null;
};

const accountNoticePeriod = (account) => {
  const noticePeriod = account.lock ? account.lock.noticePeriod : null;
  if (noticePeriod) {
    return DateHelper.getDaysFromMicroseconds(noticePeriod);
  }

  return null;
};

const accountNotLocked = (account) => {
  return !account.lock;
};

const accountNdauAmount = (account) => {
  return parseFloat(account.balance);
};

const accountTotalNdauAmount = (addressData, localizedText = true) => {
  let total = 0.0;
  addressData.forEach((account) => {
    total += parseFloat(account.balance);
  });
  return localizedText ? total.toLocaleString(AppConfig.LOCALE) : total;
};

const currentPrice = (user) => {
  return user.currentPrice;
};

export default {
  populateCurrentUserWithAddressData,
  accountLockedUntil,
  accountNdauAmount,
  accountTotalNdauAmount,
  currentPrice,
  accountNoticePeriod,
  accountNotLocked,
  accountNickname,
  receivingEAIFrom,
  sendingEAITo,
  eaiPercentage
};
