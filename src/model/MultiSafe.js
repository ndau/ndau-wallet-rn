import { AsyncStorage } from 'react-native';
import { NativeModules } from 'react-native';
import CryptoJS from 'crypto-js';
import SetupStore from './SetupStore';
import STORAGE_KEY_PREFIX from './AsyncStorageHelper';

// we put these things on either end of the combination to make sure we know that we
// have decrypted it properly
const PREFIX = 'Prefix@';
const SUFFIX = '@Suffix';

class MultiSafe {
    // a MultiSafe is created with the constructor but may not be used until it
    // is initialized with create(), which is an async function because of
    // AsyncStorage.
    constructor() {
        this.storageKey = '';
        this.encryptionKey = '';
        this.combinations = [];
    }

    // _encrypt symmetrically encrypts plaintext with pw
    _encrypt = (plain, pw) => {
        value = PREFIX + plain + SUFFIX
        encrypted = CryptoJS.AES.encrypt(value, pw);
        return encrypted
    }

    // _decrypt symmetrically decrypts plaintext from a coded value;
    // it returns either a decrypted string or null if the pw was wrong.
    _decrypt = (coded, pw) => {
        decrypted = CryptoJS.AES.decrypt(coded, pw)
        // if the password was wrong, it may not even convert to a string; test for that
        try {
            decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        } catch (err) {
            return null
        }

        // but even if it converted to a string, we still might not have decoded it properly
        // so verify that
        if ((decrypted.slice(0, PREFIX.length) != PREFIX) || (decrypted.slice(-SUFFIX.length) != SUFFIX)) {
            return null
        }
        // we're good, strip off the ends
        value = decrypted.slice(PREFIX.length, -SUFFIX.length)
        return value
    }

    // create(storagekey, combo) is the way to initialize a MultiSafe. It takes as
    // arguments:
    //
    // * A storage key (the word key here is used as in key - value pair) to use with
    // AsyncStorage, where the corresponding value will be the encrypted data blob.
    // (This is effectively the ID of the MultiSafe — if we have multiple safes
    // we’ll use different keys.)
    // * combo is the first combination to be used.
    //
    // It returns a Promise with the following properties:
    //
    // StorageKey: the storage key above
    // EncryptionKey: the public half of the keypair, used to encrypt the async blob
    // Combinations[]: an array of encryptions of DecryptionKey, which is the private
    // half of the keypair.
    // After this method is called, there will be one entry in this array, which is the
    // decryption key symetrically encrypted with combo.
    create = async (storageKey, combo) => {
        // build a random keypair (this is just for use of the storage system; it's not
        // part of the HD key framework, so it's generated from a new random value with
        // no need for derivation paths)
        seed = SetupStore.getEntropy()
        const privateKey = await NativeModules.KeyaddrManager.newKey(seed);
        const userDecryptedBytes =

            combination0 = CryptoJS.AES.encrypt(privateKey, combo);

        this.storageKey = STORAGE_KEY_PREFIX + storageKey;
        this.encryptionKey = privateKey.Public()
        this.combinations = [this.combination0];
    }

    // Verify(combination string): int
    verify = (combination) => {
    }


    // Store(data: object, combo: string): bool
    store = (combination) => {
    }

    // AddCombo(newcombo: string, oldcombo: string): bool
    addCombination = (newcombo, oldcombo) => {
    }

    // RemoveCombo(index: int): bool
    removeCombination = (index) => {
    }

    // Retrieve(combo: string): object
    retrieve = (combo) => {
    }

}

export default MultiSafe;
