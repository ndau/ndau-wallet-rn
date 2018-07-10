package com.ndauwalletrn;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import keyaddr.Keyaddr;


public class KeyaddrManager extends ReactContextBaseJavaModule {
    public KeyaddrManager(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        System.out.println("println in CONSTRUCTOR");
        Log.d("testing", "TESTING IN CONSTRUCTOR");
        try {
            String words = Keyaddr.wordsFromBytes("en", "hellow".getBytes());
            Log.d("testing","THIS IS WORKING IN CONSTRUCTOR: " + words);
        } catch (Exception e) {
            e.printStackTrace();
        }
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
            Log.e("testing","ATTEMPTING TO CALL ");
            System.out.println("Why isn't this working");
            String words = Keyaddr.wordsFromBytes(lang, data.getBytes());
            Log.d("testing","THIS IS WORKING IN CONSTRUCTOR: " + words);

            promise.resolve(words);
        } catch (Exception e) {
            promise.reject("problem getting words from bytes", e);
        }
    }
}
