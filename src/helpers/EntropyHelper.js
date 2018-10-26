import SetupStore from '../model/SetupStore';
import Base64 from 'base-64';
import { generateSecureRandom } from 'react-native-securerandom';

/**
 * This method will generate entropy and both return the value
 * as well as set it to the SetupStore.entropy. This can be used
 * in setup for generating entropy. It can also be used generically
 * to give you back a Base64 random string with the number of bytes you
 * pass in.
 *
 * @param {number} byteCount amount of bytes of entropy to generate, default is 16
 * @returns {string} Base64 version of entropy
 */
const generateEntropy = async (byteCount = 16) => {
  const secureRandom = await generateSecureRandom(byteCount);
  const secureRandomString = String.fromCharCode.apply(null, secureRandom);
  const base64Value = Base64.encode(secureRandomString);

  SetupStore.entropy = base64Value;
  return base64Value;
};

export default {
  generateEntropy
};
