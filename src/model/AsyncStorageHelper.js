import { AsyncStorage } from 'react-native';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = '@NdauAsyncStorage:user';

const getUser = async (encryptionPassword) => {
  if (!encryptionPassword) throw Error('you must pass an encryptionPassword to use this method');

  try {
    const user = await AsyncStorage.getItem(STORAGE_KEY);

    if (user !== null) {
      console.log(`getUser - encrypted user is: ${user}`);
      const userDecryptedBytes = CryptoJS.AES.decrypt(user, encryptionPassword);
      const userDecryptedString = userDecryptedBytes.toString(CryptoJS.enc.Utf8);
      console.log(`getUser - decrypted user is: ${userDecryptedString}`);

      return JSON.parse(userDecryptedString);
    } else {
      const user = {};
      await setUser(user, encryptionPassword);
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

const setUser = async (user, encryptionPassword) => {
  if (!encryptionPassword) throw Error('you must pass an encryptionPassword to use this method');

  try {
    const userString = JSON.stringify(user);
    console.log(`setUser - user to encrypt to ${STORAGE_KEY}: ${userString}`);
    const userStringEncrypted = CryptoJS.AES.encrypt(userString, encryptionPassword);
    console.log(`setUser - encrypted user is: ${userStringEncrypted}`);

    await AsyncStorage.setItem(STORAGE_KEY, userStringEncrypted.toString());

    const checkPersist = await getUser(encryptionPassword);
    console.log(`Successfully set user to: ${JSON.stringify(checkPersist, null, 2)}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUser,
  setUser
};
