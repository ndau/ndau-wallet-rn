import User from '../model/User';
import Key from '../model/Key';
import Account from '../model/Account';
import { NativeModules } from 'react-native';
import AppConstants from '../AppConstants';

// This function will create the initial User
const createFirstTimeUser = async (
  userId,
  recoveryBytes,
  chainId = AppConstants.MAINNET_ADDRESS,
  numberOfAccounts = 0
) => {
  if (!userId || !recoveryBytes) {
    throw new Error('you MUST pass userId, recoveryPhrase to this method');
  }

  try {
    const user = new User();
    user.setUserId(userId);

    const accountCreationKey = await _createAccountCreationKey(recoveryBytes);
    user.setAccountCreationKey(accountCreationKey);
    user.setKeys(_createInitialKeys(accountCreationKey));
    if (numberOfAccounts > 0) {
      user.setAccounts(await _createAccounts(numberOfAccounts, accountCreationKey, chainId));

      const addresses = user.accounts.map((value) => {
        return value.address;
      });
      user.setAddresses(addresses);
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

const _createAccountCreationKey = async (recoveryBytes) => {
  const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(recoveryBytes);
  const bip44HardenedChild = await NativeModules.KeyaddrManager.hardenedChild(
    rootPrivateKey,
    AppConstants.HARDENED_CHILD_BIP_44
  );
  const ndauConstantHardenedChild = await NativeModules.KeyaddrManager.hardenedChild(
    bip44HardenedChild,
    AppConstants.NDAU_CONSTANT
  );
  const accountCreationKey = await NativeModules.KeyaddrManager.child(
    ndauConstantHardenedChild,
    AppConstants.ACCOUNT_CREATION_KEY_CHILD
  );
  return accountCreationKey;
};

const _generateRootPath = () => {
  const returnValue =
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.ACCOUNT_CREATION_KEY_CHILD;

  return returnValue;
};

const _createInitialKeys = (accountCreationKey) => {
  const key = new Key();
  key.setKey(accountCreationKey);
  key.setDerivedFromRoot(AppConstants.DERIVED_ROOT_YES);
  key.setPath(_generateRootPath());
  let returnValue = {};
  returnValue[accountCreationKey] = key.toJSON();

  return returnValue;
};

const _createAccounts = async (numberOfAccounts, accountCreationKey, chainId) => {
  const accounts = [];
  for (let i = 1; i <= numberOfAccounts; i++) {
    const account = new Account();
    const privateKeyForAddress = await NativeModules.KeyaddrManager.child(accountCreationKey, i);
    const address = await NativeModules.KeyaddrManager.ndauAddress(privateKeyForAddress, chainId);
    account.setAddress(address);
    accounts.push(account);
  }
  return accounts;
};

export default {
  createFirstTimeUser
};
