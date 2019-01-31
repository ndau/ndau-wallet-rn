import TxSignPrep from '../TxSignPrep'

describe('TxSignPrep construction tests', () => {
  it('should build an object and store 0 properly', () => {
    const bb = new TxSignPrep()
    bb.appendUint(0)
    expect(bb.length()).toEqual(8)
    const by = bb.getBytes()
    expect(by).toEqual([0, 0, 0, 0, 0, 0, 0, 0])
  })
  it('should store a simple number correctly', () => {
    const bb = new TxSignPrep()
    bb.appendUint(0x1234)
    expect(bb.length()).toEqual(8)
    const by = bb.getBytes(8)
    expect(by).toEqual([0, 0, 0, 0, 0, 0, 0x12, 0x34])
  })
  it('should store a large number correctly', () => {
    const bb = new TxSignPrep()
    bb.appendUint(0x123456789abcd)
    expect(bb.length()).toEqual(8)
    const by = bb.getBytes()
    expect(by).toEqual([0, 0x1, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd])
  })
  it('should store a string correctly', () => {
    const bb = new TxSignPrep()
    bb.appendString('Hello')
    expect(bb.length()).toEqual(5)
    const by = bb.getBytes()
    expect(by).toEqual([0x48, 0x65, 0x6c, 0x6c, 0x6f])
  })
  it('should build up an object correctly', () => {
    const bb = new TxSignPrep()
    bb.appendString('Hello')
    bb.appendUint(0x666)
    bb.appendString('ABC')
    expect(bb.length()).toEqual(16)
    const by = bb.getBytes()
    expect(by).toEqual([
      0x48,
      0x65,
      0x6c,
      0x6c,
      0x6f,
      0,
      0,
      0,
      0,
      0,
      0,
      0x6,
      0x66,
      0x41,
      0x42,
      0x43
    ])
  })
})

describe('TxSignPrep base64 encoding tests', () => {
  // these expected strings were generated by a Go program
  it('should encode a simple 3-byte string', () => {
    const bb = new TxSignPrep()
    bb.appendString('ABC')
    expect(bb.length()).toEqual(3)
    const b64 = bb.b64encode()
    expect(b64).toEqual('QUJD')
  })
  it('should encode a 4-byte string as 8 chars with padding', () => {
    const bb = new TxSignPrep()
    bb.appendString('ABCD')
    expect(bb.length()).toEqual(4)
    const b64 = bb.b64encode()
    expect(b64).toEqual('QUJDRA==')
  })
  it('should encode a longer string correctly', () => {
    const bb = new TxSignPrep()
    bb.appendString('Hello')
    bb.appendUint(0x666)
    bb.appendString('ABC')
    expect(bb.length()).toEqual(16)
    const b64 = bb.b64encode()
    expect(b64).toEqual('SGVsbG8AAAAAAAAGZkFCQw==')
  })
})

describe('TxSignPrep base64 decoding tests', () => {
  // these expected strings were generated by a Go program
  it('should decode a simple 3-byte string', () => {
    const bb = new TxSignPrep()
    bb.b64decode('QUJD')
    // expect(bb.length()).toEqual(3)
    expect(bb.getBytes()).toEqual([0x41, 0x42, 0x43])
  })
  it('should decode a more complex string', () => {
    const bb = new TxSignPrep()
    bb.b64decode('SGVsbG8AAAAAAAAGZkFCQw==')
    expect(bb.getBytes()).toEqual([
      0x48,
      0x65,
      0x6c,
      0x6c,
      0x6f,
      0,
      0,
      0,
      0,
      0,
      0,
      0x6,
      0x66,
      0x41,
      0x42,
      0x43
    ])
  })
})

describe('TxSignPrep base64 random roundtrip tests', () => {
  // 10 times we build a random length (0-99) bb containing random bytes and expect it to
  // roundtrip properly
  for (var i = 0; i < 10; i++) {
    it('should roundtrip a random string', () => {
      var bb = new TxSignPrep()
      for (var l = Math.floor(Math.random() * 100); l; l--) {
        bb.appendString(String.fromCharCode(Math.floor(Math.random() * 256)))
      }
      const s = bb.b64encode()
      const b2 = new TxSignPrep()
      b2.b64decode(s)
      expect(b2.getBytes()).toEqual(bb.getBytes())
    })
  }
})

describe('TxSignPrep object tests', () => {
  it('should properly encode the test object we built above', () => {
    var bb = new TxSignPrep()
    var obj = {
      a: 'Hello',
      b: 0x666,
      c: 'ABC'
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(16)
    var b64 = bb.b64encode()
    expect(b64).toEqual('SGVsbG8AAAAAAAAGZkFCQw==')
  })
  it('should properly encode the above with fields out of order', () => {
    var bb = new TxSignPrep()
    var obj = {
      // fields should be sorted
      c: 'ABC',
      a: 'Hello',
      b: 0x666
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(16)
    var b64 = bb.b64encode()
    expect(b64).toEqual('SGVsbG8AAAAAAAAGZkFCQw==')
  })
  it('should properly do bool values', () => {
    var bb = new TxSignPrep()
    var obj = {
      t: true,
      f: false
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(2)
    var b64 = bb.b64encode()
    expect(b64).toEqual('AAE=')
  })
  it('should properly do arrays', () => {
    var bb = new TxSignPrep()
    var obj = {
      a: [17, 29, 31]
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(24)
    var b64 = bb.b64encode()
    expect(b64).toEqual('AAAAAAAAABEAAAAAAAAAHQAAAAAAAAAf')
  })
  it('should properly do nested objects', () => {
    var bb = new TxSignPrep()
    var obj = {
      c: 'ABC',
      x: 'Hello',
      b: {
        d: 123,
        e: 'something'
      }
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(25)
    var b64 = bb.b64encode()
    expect(b64).toEqual('AAAAAAAAAHtzb21ldGhpbmdBQkNIZWxsbw==')
  })
  it('should ignore fields named signature or signatures', () => {
    var bb = new TxSignPrep()
    var obj = {
      c: 'ABC',
      x: 'Hello',
      signature: 'forged',
      b: {
        d: 123,
        e: 'something',
        signatures: 'X'
      }
    }
    bb.prepare(obj)
    expect(bb.length()).toEqual(25)
    var b64 = bb.b64encode()
    expect(b64).toEqual('AAAAAAAAAHtzb21ldGhpbmdBQkNIZWxsbw==')
  })
})