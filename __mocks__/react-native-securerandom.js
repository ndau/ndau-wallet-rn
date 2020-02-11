/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */


// Import this named export into your test file:
module.exports = {
    generateSecureRandom: jest.fn((length) => {
        return new Promise((resolve) => {
            const arr = (new Array(length)).fill(0)
            resolve(Uint8Array.from(arr.map(
                () => Math.floor(Math.random() * 256)
            )));
        })
    })
}
