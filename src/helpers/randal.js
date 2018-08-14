import sha256 from 'crypto-js/sha256';
import { generateSecureRandom } from 'react-native-securerandom';

// Randal handles capturing randomness by taking scribbled points as input.
// Basic algorithm is this:
//   Get two random coprimes
//   for any new points where hypotenuse of Δ >= threshold
//     new hash = hash(Δx*coprime1 + Δy*coprime2)
//   update old hash with some new hash
//   update trip length
const distanceThreshold = 5; // in pixels
const quota = 256; // arbitrary
const coprimeSpace = 65536; // 2^16, arbitrary
export default class Randal {
  init() {
    return Promise.all([ generateSecureRandom(32), generateSecureRandom(32) ])
      .then(([ seed, xor ]) => {
        console.log('IM HERE');
        this.coprimes = this._genCoprimes();
        this.home = [ 0, 0 ];
        this.xor = xor;
        this.steps = 0;
        // converts from Uint8Array to a string
        const sSeed = seed
          .reduce((a, e, i) => {
            a[i] = String.fromCharCode(e);
            return a;
          }, [])
          .join('');
        this.hash = sha256(sSeed);
        this.updateHandlers = [];
        this.doneHandlers = [];
        console.log('FINISHED');
      })
      .catch((e) => {
        console.log(`Randal.init: could not get random number: ${e}`);
      });
  }

  // checkPoint adds a point and rehashes if it's far enough away
  checkPoint(x, y) {
    // sanitize
    x = parseFloat(x); // react native actually provides subpixel coordinates
    y = parseFloat(y);

    // validate
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw Randal.CheckPointArgumentError;
    }
    if (!(Number.isFinite(x) && Number.isFinite(y))) {
      throw Randal.CheckPointInfiniteError;
    }
    // check distance
    const deltas = [ this.home[0] - x, this.home[1] - y ];
    const distance = Math.sqrt(deltas[0] * deltas[0] + deltas[1] * deltas[1]);
    if (distance >= distanceThreshold) {
      this._addStep(deltas, [ x, y ]);
    }
  }
  // getHash returns the hex representation of the hash xor'd with a number from securerandom
  getHash() {
    let xored = '';

    // xor our hash with the xor, save as hex
    this._hashUint8Array().forEach((el, i) => {
      xored += (el ^ this.xor[i]).toString(16);
    });

    return xored;
  }
  // getPercentage returns how much of the quota is fulfilled.
  getPercentage() {
    return Math.round(this.steps / quota * 100);
  }
  // onUpdate adds a subscriber to the update event.
  onUpdate(fn) {
    if (typeof fn !== 'function') {
      throw Randal.UpdateFunctionError;
    }
    if (this.updateHandlers) this.updateHandlers.push(fn);
  }
  // onDone adds a subscriber to the done event.
  onDone(fn) {
    if (typeof fn !== 'function') {
      throw Randal.DoneFunctionError;
    }
    if (this.doneHandlers) this.doneHandlers.push(fn);
  }
  // _addStep rehashes based on new position input.
  _addStep(delta, pos) {
    const posEnc = delta[0] * this.coprimes[0] + (delta[1] * this.coprimes[1]).toString();
    this.hash = sha256(this.hash.concat(sha256(posEnc)).toString());
    this.steps++;
    this.home = pos;
    this.updateHandlers.forEach((fn) => fn());
    if (this.steps >= quota) {
      this.doneHandlers.forEach((fn) => fn());
    }
  }
  // _genCoprimes finds two random coprimes.
  _genCoprimes() {
    let triesLeft = 4096; // 2 ^ 12
    let candidateA = 0;
    let candidateB = 0;
    while (triesLeft--) {
      candidateA = Math.floor(coprimeSpace * Math.random());
      candidateB = Math.floor(coprimeSpace * Math.random());
      if (this._isCoprime(candidateA, candidateB)) {
        break;
      }
    }
    return [ candidateA, candidateB ];
  }
  // _hashUint8Array returns our hash as a Uint8Array
  _hashUint8Array() {
    return Uint8Array.from(
      this.hash.words.reduce(
        (a, w) => a.concat([ (w >> 24) & 0xff, (w >> 16) & 0xff, (w >> 8) & 0xff, w & 0xff ]),
        []
      )
    );
  }
  // isCoprime returns true if a and b are coprime.
  _isCoprime(a, b) {
    if (b === 1) {
      return true;
    }
    if (!(a % b)) {
      return false;
    } else {
      return this._isCoprime(b, a % b);
    }
  }
  // exported for testing
  static get DistanceThreshold() {
    return distanceThreshold;
  }
  // exported for testing
  static get Quota() {
    return quota;
  }
  // errors
  static CheckPointArgumentError = Error('Randal.checkPoint: invalid x or y.');
  static CheckPointInfiniteError = Error('Randal.checkPoint: x and y must be finite.');
  static DoneFunctionError = Error('Randal.onDone: argument was not a function.');
  static UpdateFunctionError = Error('Randal.onUpdate: argument was not a function.');
}
