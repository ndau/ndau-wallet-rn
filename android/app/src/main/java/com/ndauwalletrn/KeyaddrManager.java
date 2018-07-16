package com.ndauwalletrn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import keyaddr.Key;
import keyaddr.Keyaddr;


public class KeyaddrManager extends ReactContextBaseJavaModule {
    public KeyaddrManager(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "KeyaddrManager";
    }

    @ReactMethod
    public void KeyaddrWordsFromBytes(
            String lang, String data,
            Promise promise) {
        try {
            promise.resolve(Keyaddr.wordsFromBytes(lang, data));
        } catch (Exception e) {
            promise.reject("problem getting words from bytes", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void KeyaddrWordsToBytes(
            String lang, String bytes,
            Promise promise) {
        try {
            promise.resolve(Keyaddr.wordsToBytes(lang, bytes));
        } catch (Exception e) {
            promise.reject("problem getting words to bytes", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void CreatePrivateKey(
            String bytes,
            Promise promise) {
        try {
            Key privateKey = Keyaddr.newKey(bytes);
            promise.resolve(privateKey.getKey());
        } catch (Exception e) {
            promise.reject("problem getting words to bytes", e.getLocalizedMessage());
        }
    }
}
