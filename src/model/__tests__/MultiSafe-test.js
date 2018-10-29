import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock('AsyncStorage', () => mockImpl);
};

mock();

import MultiSafe from '../MultiSafe';
import { HTML5_FMT } from 'moment';

describe('MultiSafe _encrypt/_decrypt tests...', () => {
  it('should store and retrieve an object using the official API', async () => {
    let o = {
      s: "I'm Satoshi Nakamoto",
      ndau: 1234437970
    };
    let k = 'themetalkey';
    let pw = '1234';
    let sk = 'storagekey1';
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    let y = await ms.retrieve(pw);
    expect(o).toEqual(y);
  });

  it('should overwrite an object', async () => {
    let o = {
      s: "I'm Satoshi Nakamoto",
      ndau: 1234437970
    };
    let k = 'themetalkey';
    let pw = '1234';
    let sk = 'storagekey2';
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    o.s = '(my real name is craig, I promise)';
    await ms.store(o, pw);
    let y = await ms.retrieve(pw);
    expect(o).toEqual(y);
  });

  it('should be able to verify and use any of multiple keys', async () => {
    let o = {
      s: "I'm Satoshi Nakamoto",
      ndau: 1234437970
    };
    let k = 'themetalkey';
    let sk = 'storagekey3';
    let pw = 'r00t';
    let morepws = [ 'passw0rd', 'correct-horse-battery-staple', 'random garbage', 'kittycat' ];
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    for (let p of morepws) {
      await ms.addCombination(p, pw);
    }
    for (let p of morepws) {
      expect(await ms.verify(p)).toBeTruthy();
      let y = await ms.retrieve(p);
      expect(o).toEqual(y);
    }
  });

  it('should not be able to add a new key without a good one', async () => {
    let o = {
      s: "I'm Satoshi Nakamoto",
      ndau: 1234437970
    };
    let k = 'themetalkey';
    let pw1 = '1234';
    let pw2 = 'correct-horse-battery-staple';
    let sk = 'storagekey4';
    let ms = new MultiSafe();
    await ms.create(sk, pw1);
    await ms.store(o, pw1);
    try {
      await ms.addCombination(pw2, 'badkey');
      expect('should never get here').toBeFalsy();
    } catch (err) {
      expect(err).toBeDefined();
    }
    try {
      let y = await ms.retrieve(pw2);
      expect('should never get here').toBeFalsy();
    } catch (err) {
      expect(err).toBeDefined();
    }
    let y = await ms.retrieve(pw1);
    expect(o).toEqual(y);
  });

  it('should fail to retrieve an object with a bad pw', async () => {
    let o = {
      s: "I'm Satoshi Nakamoto",
      ndau: 1234437970
    };
    let k = 'themetalkey';
    let pw = '1234';
    let sk = 'storagekey5';
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    let y = await ms.retrieve(pw);
    expect(o).toEqual(y);
    try {
      let z = await ms.retrieve('123');
      expect('should never get here').toBeFalsy();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should be able to get the storage with a newly created MultiSafe', async () => {
    console.log('starting last test');
    let o = {
      s: 'I am Groot',
      ndau: 1234437970
    };
    let pw = '1234';
    let sk = 'storagekey6';
    let ms = new MultiSafe();
    console.log('creating 1');
    await ms.create(sk, pw);
    console.log('Storing 1');
    await ms.store(o, pw);
    console.log('retrieving 1');
    let y = await ms.retrieve(pw);
    expect(y).toEqual(o);
    expect(await ms.verify(pw)).toBeTruthy();

    let ms1 = new MultiSafe();
    console.log('creating 2');
    await ms1.create(sk, pw);
    expect(ms1.storageKey).toEqual(ms.storageKey);
    console.log('verifying 2');
    expect(await ms1.verify(pw)).toBeTruthy();
    console.log('retrieving 2');
    let z = await ms1.retrieve(pw);
    expect(z).toEqual(o);
  });

  it('should see if a MultiSafe is present', async () => {
    let o = {
      s: 'I am Groot',
      ndau: 1234437970
    };
    let pw = '1234';
    let sk = 'mystoragekeygroot1';
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    let y = await ms.retrieve(pw);
    expect(o).toEqual(y);
    expect(await MultiSafe.isAMultiSafePresent()).toBe(true);
  });

  it('should be able to get the storage key', async () => {
    let o = {
      s: 'I am Groot',
      ndau: 1234437970
    };
    let pw = '1234';
    let sk = 'mystoragekeygroot2';
    let ms = new MultiSafe();
    await ms.create(sk, pw);
    await ms.store(o, pw);
    let y = await ms.retrieve(pw);
    expect(o).toEqual(y);

    let ms1 = new MultiSafe();
    let storageKeys = await ms1.getStorageKeys();
    console.log(`storageKeys are ${storageKeys}`);
    expect(storageKeys[7]).toEqual(sk);
  });
});
