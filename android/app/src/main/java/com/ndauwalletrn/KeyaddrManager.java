package com.ndauwalletrn;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.ReactConstants;

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
            Log.w(ReactConstants.TAG, "======================================\n\n");
            String words = Keyaddr.wordsFromBytes(lang, data.getBytes());
            Log.w(ReactConstants.TAG,"THIS IS WORKING IN CONSTRUCTOR: " + words);

            promise.resolve(words);
        } catch (Exception e) {
            promise.reject("problem getting words from bytes", e);
        }
    }
}
