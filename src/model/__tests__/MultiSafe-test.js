import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
    const mockImpl = new MockAsyncStorage();
    jest.mock('AsyncStorage', () => mockImpl);
};

mock();

import MultiSafe from '../MultiSafe';
import { HTML5_FMT } from 'moment';

describe('MultiSafe _encrypt/_decrypt tests...', () => {
    it('should encrypt/decrypt a simple string', () => {
        word = "my secret"
        password = "don't tell"

        ms = new MultiSafe()
        encrypted = ms._encrypt(word, password)
        decrypted = ms._decrypt(encrypted, password)
        expect(decrypted).toEqual(word)
    });
    it('should encrypt/decrypt a json-like string', () => {
        word = "{}"
        password = "don't tell"

        ms = new MultiSafe()
        encrypted = ms._encrypt(word, password)
        decrypted = ms._decrypt(encrypted, password)
        expect(decrypted).toEqual(word)
    });
    it('should encrypt/decrypt an empty string', () => {
        word = ""
        password = "don't tell"

        ms = new MultiSafe()
        encrypted = ms._encrypt(word, password)
        decrypted = ms._decrypt(encrypted, password)
        expect(decrypted).toEqual(word)
    });
    it('should encrypt/decrypt a JSON blob', () => {
        obj = {
            x: "hello",
            y: 123
        }
        password = "don't tell"

        ms = new MultiSafe()
        encrypted = ms._encrypt(JSON.stringify(obj), password)
        decrypted = JSON.parse(ms._decrypt(encrypted, password))
        expect(decrypted).toEqual(obj)
    });
    it('should fail to decrypt with bad password', () => {
        word = "my secret"
        password = "don't tell"

        ms = new MultiSafe()
        encrypted = ms._encrypt(word, password)
        decrypted = ms._decrypt(encrypted, "i told")
        expect(decrypted).toEqual(null)
    });
});

describe('MultiSafe storage tests...', () => {

    it('should store and retrieve a string', async () => {
        let s = "we do housecalls!";
        let ms = new MultiSafe();
        let k = "thekey";
        // ms = await new MultiSafe().create("mystoragekey", "1234")
        let x = ms._storeString(k, s);
        let y = ms._retrieveString(k);
        expect(y).toEqual(x);
    });

    it('should store and retrieve an object', async () => {
        let o = {
            s: "I'm Ben Franklin",
            ndau: 1234
        }
        let ms = new MultiSafe();
        let k = "themetalkey";
        // ms = await new MultiSafe().create("mystoragekey", "1234")
        let x = ms._storeObject(k, o);
        let y = ms._retrieveObject(k);
        expect(y).toEqual(x);
    });

    it('should store and retrieve an encrypted object', async () => {
        let o = {
            s: "I'm Satoshi Nakamoto",
            ndau: 1234437970
        }
        let k = "themetalkey";
        let pw = "1234";
        let sk = "mystoragekey";
        let ms = new MultiSafe();
        await ms.create(sk, pw);
        expect(ms.storageKey).toEqual(sk);
        ms._storeEncryptedObject(k, o, pw)
        let y = await ms._retrieveEncryptedObject(k, pw);
        expect(o).toEqual(y);
    });

    it('should store and retrieve an object using the official API', async () => {
        let o = {
            s: "I'm Satoshi Nakamoto",
            ndau: 1234437970
        }
        let k = "themetalkey";
        let pw = "1234";
        let sk = "mystoragekey";
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
        }
        let k = "themetalkey";
        let pw = "1234";
        let sk = "mystoragekey";
        let ms = new MultiSafe();
        await ms.create(sk, pw);
        await ms.store(o, pw);
        o.s = "(my real name is craig, I promise)";
        await ms.store(o, pw);
        let y = await ms.retrieve(pw);
        expect(o).toEqual(y);
    });

    it('should be able to verify and use any of multiple keys', async () => {
        let o = {
            s: "I'm Satoshi Nakamoto",
            ndau: 1234437970
        }
        let k = "themetalkey";
        let sk = "mystoragekey";
        let pw = "r00t"
        let morepws = ["passw0rd", "correct-horse-battery-staple", "random garbage", "kittycat"]
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
        }
        let k = "themetalkey";
        let pw1 = "1234";
        let pw2 = "correct-horse-battery-staple"
        let sk = "mystoragekey";
        let ms = new MultiSafe();
        await ms.create(sk, pw1);
        await ms.store(o, pw1);
        try {
            await ms.addCombination(pw2, "badkey");
            expect("should never get here").toBeFalsy();
        } catch (err) {
            expect(err).toBeDefined();
        }
        try {
            let y = await ms.retrieve(pw2);
            expect("should never get here").toBeFalsy();
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
        }
        let k = "themetalkey";
        let pw = "1234";
        let sk = "mystoragekey";
        let ms = new MultiSafe();
        await ms.create(sk, pw);
        await ms.store(o, pw);
        let y = await ms.retrieve(pw);
        expect(o).toEqual(y);
        try {
            let z = await ms.retrieve("123");
            expect("should never get here").toBeFalsy();
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

});
