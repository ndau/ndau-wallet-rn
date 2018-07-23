package com.ndauwalletrn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import keyaddr.Address;
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
            String lang, String bytes,
            Promise promise) {
        try {
            promise.resolve(Keyaddr.wordsFromBytes(lang, bytes));
        } catch (Exception e) {
            promise.reject("problem getting words from bytes", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void KeyaddrWordsToBytes(
            String lang, String words,
            Promise promise) {
        try {
            promise.resolve(Keyaddr.wordsToBytes(lang, words));
        } catch (Exception e) {
            promise.reject("problem getting words to bytes", e.getLocalizedMessage());
        }
    }

    @ReactMethod
    public void CreatePublicAddress(
            String bytes,
            Integer count,
            Promise promise) {
        try {
            WritableNativeArray array = new WritableNativeArray();
            for (int i = 1; i <= count; i++) {
                Address publicAddress = Keyaddr.newKey(bytes).child(i).ndauAddress();
                array.pushString(publicAddress.getAddress());
            }

            promise.resolve(array);
        } catch (Exception e) {
            promise.reject("problem getting words to bytes", e.getLocalizedMessage());
        }
    }
}
