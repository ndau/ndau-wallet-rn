/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import SetupStore from '../stores/SetupStore';
import Base64 from 'base-64';

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
  let initArray = new Uint8Array(byteCount);
  const secureRandom = await crypto.getRandomValues(initArray);
  console.log({secureRandom});
  const secureRandomString = String.fromCharCode.apply(null, secureRandom);
  console.log({secureRandomString});
  const base64Value = Base64.encode(secureRandomString);
  console.log({base64Value});

  SetupStore.entropy = base64Value;
  return base64Value;
};

export default {
  generateEntropy,
};
