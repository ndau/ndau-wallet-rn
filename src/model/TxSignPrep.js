/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

// This is an error class that can be thrown in the case of bad usage
class TxSignPrepError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, TxSignPrepError)
    this.message = 'error in TxSignPrep'
  }
}

class TxSignPrep {
  // a TxSignPrep is used to build an array of integer values (each representing one byte)
  // in the proper order for signing.
  // Because the length of these varies, it doesn't seem to be of much advantage to
  // try to use the JS Buffer and ByteArray concepts. We just track a normal JS array.
  //
  // Our key and signature systems expect to receive data as a base-64 encoded block. However,
  // the standard js base64 function expects base64 to transform to and from strings.
  // Because strings are always interpreted as utf-8 (we can't treat them as arrays of bytes) we
  // need to reimplement base-64 encoding and decoding in this object.

  constructor () {
    // this is the array we build up
    this._bytes = []
    // this is the character set used for base64; it's the "standard" b64 set defined in RFC 4648.
    this._keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }

  // b64encode encodes this object's byte array to a string using standard base64 encoding.
  b64encode = () => {
    var t = ''
    var x, y, z, a, b, c, d
    var i = 0
    while (i < this._bytes.length) {
      // grab 3 bytes at once
      // and convert to 4 characters
      x = this._bytes[i++]
      y = this._bytes[i++]
      z = this._bytes[i++]
      a = x >> 2
      b = ((x & 3) << 4) | (y >> 4)
      c = ((y & 15) << 2) | (z >> 6)
      d = z & 63
      if (isNaN(y)) {
        c = d = 64
      } else if (isNaN(z)) {
        d = 64
      }
      t +=
        this._keyStr.charAt(a) +
        this._keyStr.charAt(b) +
        this._keyStr.charAt(c) +
        this._keyStr.charAt(d)
    }
    return t
  }

  // helper function to look up a character in _keyStr
  _lookup = (s, ix) => {
    const c = s.charAt(ix)
    const p = this._keyStr.indexOf(c)
    return p
  }

  // b64decode accepts a string and overwrites the _bytes array with the decoding
  // of the string passed in.
  b64decode = s => {
    // strip noise
    s = s.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    const t = []
    var a, b, c, d
    var i = 0
    while (i < s.length) {
      // grab 4 characters at once
      // and convert to 3 'bytes' in our output
      a = this._lookup(s, i++)
      b = this._lookup(s, i++)
      c = this._lookup(s, i++)
      d = this._lookup(s, i++)
      t.push(((a << 2) & 0xfc) | ((b >> 4) & 0x03))
      if (c !== 64) {
        t.push(((b << 4) & 0xf0) | ((c >> 2) & 0x0f))
      }
      if (d !== 64) {
        t.push(((c << 6) & 0xc0) | (d & 0x3f))
      }
      this._bytes = t
    }
  }

  // appendBytes takes a stream of bytes and appends them to this._bytes.
  appendBytes = newBytes => {
    this._bytes = this._bytes.concat(newBytes)
  }

  // appendString takes a string and appends it to this._bytes one char at a time.
  appendString = s => {
    for (var i = 0; i < s.length; i++) {
      this._bytes.push(s.charCodeAt(i))
    }
  }

  // appendBool takes a truthy value and appends either 0x1 or 0x0 to this._bytes
  appendBool = b => {
    this._bytes.push(b ? 0x01 : 0x00)
  }

  // appendUint is intended to be used on values that are known to be positive.
  // a JS Number has 2^52 usable bits as an integer, but bitwise operations only
  // work on the lower 32 bits.
  // 52 bits is all we can work with here, and we can't use bit shift -- we have to use divide.
  // If it's outside the set of safe positive integers, we gots a problem.
  appendUint = n => {
    if (!Number.isSafeInteger(n) || n < 0) {
      throw TxSignPrepError
    }
    // construct an array of 8 bytes and fill it in from the right end
    var newBytes = [0, 0, 0, 0, 0, 0, 0, 0]
    // only goes to 7 because we only have 52 bits
    // we can short-circuit this if n becomes 0
    for (var i = 0; n && i < 7; i++) {
      newBytes[7 - i] = n % 256
      n = Math.floor(n / 256) // should use >> but js only does the lower 32 bits that way
    }
    this.appendBytes(newBytes)
  }

  // getBytes returns the array of bytes
  getBytes = () => {
    return this._bytes
  }

  // length returns the number of bytes in _bytes.
  // this function can verify that the expected length is the actual length
  length = () => {
    return this._bytes.length
  }

  // prepare accepts any js value and stores it into the array.
  // It examines the types of the value and prepares it appropriately according
  // to its type.
  // Plain types -- number, string, boolean -- are stored directly.
  // Null values are not stored.
  // Arrays are stored by iterating the individual values in the array.
  // Objects are stored by iterating the fields in alphabetical order and then calling
  // prepare recursively.
  // Fields named "signature" or "signatures" are ignored, as
  // the reason for using this function is to be able to generate a signable object
  // which should not include those fields.
  prepare = v => {
    switch (typeof v) {
      case 'number':
        this.appendUint(v)
        break
      case 'string':
        this.appendString(v)
        break
      case 'boolean':
        this.appendBool(v)
        break
      case 'object':
        if (v === null) {
          // we omit null fields
        } else if (Array.isArray(v)) {
          v.forEach(x => {
            this.prepare(x)
          })
        } else {
          var keys = Object.keys(v).sort()
          keys.forEach(k => {
            // prepare all its elements unless they're named signature or signatures
            if (!k.match(/^signatures?$/i)) {
              this.prepare(v[k])
            }
          })
        }
        break
      default:
        // we ignore things we don't understand, like undefined and functions
        break
    }
    return this
  }
}

export default TxSignPrep
