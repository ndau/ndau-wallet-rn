const sha256 = require('crypto-js/sha256');

// Randal handles capturing randomness by taking scribbled points as input.
// Basic algorithm is this:
//   Get two random coprimes
//   for any new points where hypotenuse of Δ >= threshold
//     new hash = hash(Δx*coprime1 + Δy*coprime2)
//   update old hash with some new hash
//   update trip length
const distanceThreshold = 5; // in pixels
const quota = 1028; // arbitrary
const coprimeSpace = 65536; // 2^16, arbitrary
export default class Randal {
    constructor() {
        this.coprimes = this._genCoprimes();
        this.seed = (new Date).getTime();
        this.home = [0, 0];
        this.steps = 0;
        this.hash = "";
        this.updateHandlers = [];
        this.doneHandlers = [];
    }
    // checkPoint adds a point and rehashes if it's far enough away
    checkPoint(x, y) {
        // sanitize
        x = parseFloat(x); // react native actually provides subpixel coordinates
        y = parseFloat(y);

        // validate
        if (Number.isNaN(x) || Number.isNaN(y)) {
            throw Randal.CheckPointArgumentError
        }
        if (!(Number.isFinite(x) && Number.isFinite(y))) {
            throw Randal.CheckPointInfiniteError
        }
        // check distance
        const deltas = [this.home[0] - x, this.home[1] - y];
        const distance = Math.sqrt((deltas[0] * deltas[0]) + (deltas[1] * deltas[1]));
        if (distance >= distanceThreshold) {
            this._addStep(deltas, [x, y]);
        }
    }
    // getPercentage returns how much of the quota is fulfilled.
    getPercentage() {
        return Math.round((this.steps / quota) * 100);
    }
    // onUpdate adds a subscriber to the update event.
    onUpdate(fn) {
        if (typeof fn !== "function") {
            throw Randal.UpdateFunctionError
        }
        this.updateHandlers.push(fn);
    }
    // onDone adds a subscriber to the done event.
    onDone(fn) {
        if (typeof fn !== "function") {
            throw Randal.DoneFunctionError
        }
        this.doneHandlers.push(fn);
    }
    // _addStep rehashes based on new position input.
    _addStep(delta, pos) {
        const posEnc = (delta[0] * this.coprimes[0]) + (delta[1] * this.coprimes[1]);
        this.hash = sha256(this.hash + posEnc);
        this.steps++;
        this.home = pos;
        this.updateHandlers.forEach((fn) => fn());
        if (this.steps >= quota) {
            this.doneHandlers.forEach((fn) => fn());
        }
    }
    // _genCoprimes finds two random coprimes.
    _genCoprimes() {
        const m = new MersenneTwister(this.seed);
        let triesLeft = 4096; // 2 ^ 12
        let candidateA = 0;
        let candidateB = 0;
        while (triesLeft--) {
            candidateA = Math.floor(coprimeSpace * m.random());
            candidateB = Math.floor(coprimeSpace * m.random());
            if (this._isCoprime(candidateA, candidateB)) {
                break;
            }
        }
        return [candidateA, candidateB];
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
    static CheckPointArgumentError = Error('Randal.checkPoint: invalid x or y.')
    static CheckPointInfiniteError = Error('Randal.checkPoint: x and y must be finite.')
    static DoneFunctionError = Error('Randal.onDone: argument was not a function.')
    static UpdateFunctionError = Error('Randal.onUpdate: argument was not a function.')
}






// copypasta from https://gist.github.com/banksean/300494

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function (seed) {
    if (seed == undefined) {
        seed = new Date().getTime();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;   /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

    this.init_genrand(seed);
}

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function (s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
        this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
            + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i = 1; j = 0;
    k = (this.N > key_length ? this.N : key_length);
    for (; k; k--) {
        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
        this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
            + init_key[j] + j; /* non linear */
        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
        i++; j++;
        if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
        if (j >= key_length) j = 0;
    }
    for (k = this.N - 1; k; k--) {
        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
        this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
            - i; /* non linear */
        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
        i++;
        if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
    }

    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
}

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function () {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) { /* generate N words at one time */
        var kk;

        if (this.mti == this.N + 1)   /* if init_genrand() has not been called, */
            this.init_genrand(5489); /* a default initial seed is used */

        for (kk = 0; kk < this.N - this.M; kk++) {
            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
            this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        for (; kk < this.N - 1; kk++) {
            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

        this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function () {
    return (this.genrand_int32() >>> 1);
}

/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function () {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function () {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function () {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function () {
    var a = this.genrand_int32() >>> 5, b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */
