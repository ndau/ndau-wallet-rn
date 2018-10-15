import { NativeModules } from 'react-native';
import KeyAddrGenManager from '../keyaddrgen/KeyAddrGenManager';
import NdauNodeAPI from '../api/NdauNodeAPI';
import AppConfig from '../AppConfig';
import AppConstants from '../AppConstants';

/**
 * First we check to see if there are a variable number of accounts existent
 * on the block chain using the root key. This is to support versions <= 1.6 of
 * the ndau wallet. The result of that call is stored in an array and we then
 * see if there are the same variable amount of accounts in the BIP44 address.
 * Once we have these if they both have nothing in them, we can assume the phrase
 * is incorrect. However, if either one of them do...we have a correct phrase and
 * we can then build a user from that information. The user build is passed back.
 *
 * @param  {string} recoveryPhraseString as a string of words, a sentence
 * @param  {string} userId user ID to be used in user creation's userId field
 * @return {User} we either pass back null if nothing is found or a populated
 * user if we find information.
 */
const checkRecoveryPhrase = async (recoveryPhraseString, userId) => {
  const recoveryPhraseStringAsBytes = await _getRecoveryStringAsBytes(recoveryPhraseString);
  let user = await KeyAddrGenManager.createFirstTimeUser(userId, recoveryPhraseStringAsBytes);

  const bip44Accounts = await _checkBIP44Addresses(recoveryPhraseStringAsBytes);
  console.log(`BIP44 accounts found: ${JSON.stringify(bip44Accounts, null, 2)}`);
  if (bip44Accounts && bip44Accounts.addressData.length > 0) {
    user = await KeyAddrGenManager.addAccounts(user, bip44Accounts.addressData.length);
    console.log(`user with BIP44: ${JSON.stringify(user, null, 2)}`);
  }

  const rootAccounts = await _checkRootAddresses(recoveryPhraseStringAsBytes);
  console.log(`root accounts found: ${JSON.stringify(rootAccounts, null, 2)}`);
  if (rootAccounts && rootAccounts.addressData.length > 0) {
    //Here again we are attempting to genereate at the very root of the tree
    user = await KeyAddrGenManager.addAccounts(user, rootAccounts.addressData.length, '');
    console.log(`user with root: ${JSON.stringify(user, null, 2)}`);
  }

  return user.accounts ? user : null;
};

const _getRecoveryStringAsBytes = async (recoveryPhraseString) => {
  return await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
    AppConstants.APP_LANGUAGE,
    recoveryPhraseString
  );
};

const _checkRootAddresses = async (recoveryPhraseStringAsBytes) => {
  const addresses = await KeyAddrGenManager.getRootAddresses(recoveryPhraseStringAsBytes);
  console.log(`_checkRootAddresses found: ${addresses}`);
  //check the blockchain to see if any of these exist
  const accountData = await NdauNodeAPI.getAddressData(
    AppConfig.DEFAULT_NODE_TO_TALK_TO,
    addresses
  );
  return accountData;
};

const _checkBIP44Addresses = async (recoveryPhraseStringAsBytes) => {
  const addresses = await KeyAddrGenManager.getBIP44Addresses(recoveryPhraseStringAsBytes);
  console.log(`_checkBIP44Addresses found: ${addresses}`);
  //check the blockchain to see if any of these exist
  const accountData = await NdauNodeAPI.getAddressData(
    AppConfig.DEFAULT_NODE_TO_TALK_TO,
    addresses
  );
  return accountData;
};

export default {
  checkRecoveryPhrase
};
