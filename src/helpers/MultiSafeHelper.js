import User from '../model/User';
import KeyAddrGenManager from '../keyaddrgen/KeyAddrGenManager';
import AppConstants from '../AppConstants';
import UserData from '../model/UserData';
import PhoneData from '../model/PhoneData';
import { NativeModules } from 'react-native';
import MultiSafe from '../model/MultiSafe';

/**
 * This function will persist the user information after any setup is
 * complete. If there is an existing user it should be passed to this
 * function so appropriate information can be gathered from it.
 *
 * @param {User} user
 * @param {string} recoveryPhraseString
 * @param {string} walletName
 * @param {number} numberOfAccounts
 * @param {string} encryptionPassword
 * @param {string} addressType=AppConstants.MAINNET_ADDRESS
 */
const setupNewUser = async (
  user,
  recoveryPhraseString,
  walletName,
  numberOfAccounts,
  encryptionPassword,
  addressType = AppConstants.MAINNET_ADDRESS
) => {
  if (!user) {
    console.debug('Generating all keys from phrase given...');
    console.debug(`recoveryPhraseString: ${recoveryPhraseString}`);
    const recoveryPhraseAsBytes = await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
      AppConstants.APP_LANGUAGE,
      recoveryPhraseString
    );
    console.debug(`recoveryPhraseAsBytes: ${recoveryPhraseAsBytes}`);

    user = await KeyAddrGenManager.createFirstTimeUser(
      recoveryPhraseAsBytes,
      walletName,
      addressType,
      numberOfAccounts
    );
  }

  return _internalSaveUser(user, encryptionPassword, walletName, recoveryPhraseString);
};

const _internalSaveUser = async (user, encryptionPassword, walletName, recoveryPhraseString) => {
  const multiSafe = new MultiSafe();

  let phoneData = new PhoneData();
  phoneData.users[walletName] = user;

  console.log(`persisting the following into MultiSafe: ${JSON.stringify(phoneData, null, 2)}`);

  await UserData.loadData(user);

  //create a multisafe
  await multiSafe.create(walletName, encryptionPassword);
  //store the phone data
  await multiSafe.store(phoneData, encryptionPassword);
  //add recovery phrase as combination so we can unlock with this
  if (recoveryPhraseString)
    await multiSafe.addCombination(recoveryPhraseString, encryptionPassword);

  return user;
};

/**
 * This passes back the default user. At this time the default user
 * is the first user in the phoneData object.
 *
 * @param {string} encryptionPassword any password combination to get at phoneData
 */
const getDefaultUser = async (encryptionPassword) => {
  const multiSafe = new MultiSafe();

  //get all storage keys and get the first one
  const storageKeys = await multiSafe.getStorageKeys();
  //call create to initialize the storageKey
  await multiSafe.create(storageKeys[0], encryptionPassword);
  //actually get the data
  const phoneData = await multiSafe.retrieve(encryptionPassword);
  //For now we send back the first property in the phoneData object
  //as the default user, this may change in the future
  //First we get the value of users...
  const firstUser = Object.values(phoneData)[0];
  //then we send back the actual value of the first property
  return Object.values(firstUser)[0];
};

/**
 * Save a user to MultiSafe with the corresponding password.
 *
 * @param {User} user User to be saved into MultiSafe
 * @param {string} encryptionPassword to save it in with
 */
const saveUser = async (user, encryptionPassword) => {
  return _internalSaveUser(user, encryptionPassword, user.userId);
};

export default {
  setupNewUser,
  getDefaultUser,
  saveUser
};
