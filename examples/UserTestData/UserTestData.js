/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

// ATTENTION COOL TESTING FEATURE
// If you would like to test sending data from our log entries
// simply populate this with valid JSON from the log file.
// This data is used INSTEAD OF what is in MultiSafe. HOWEVER,
// one caveat to this as it will safe this data into your MultiSafe
// so once you do this you will have the data in MultiSafe until
// you clean the device you are working on. This is not a terrible
// thing at all if you are trying to recreate a customer problem
// MAKE SURE that you set this back to null when finished
//
// this file must be put in src/helpers
const user = null

export default {
  user: user || null
}
