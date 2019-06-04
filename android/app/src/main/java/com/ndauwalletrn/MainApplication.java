package com.ndauwalletrn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.chirag.RNMail.RNMail;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(new MainReactPackage(), new RNGestureHandlerPackage(), new RNMail(),
                    new RNFSPackage(), new RNDeviceInfo(), new AsyncStoragePackage(), new SvgPackage(),
                    new RNVersionNumberPackage(), new LinearGradientPackage(), new RNBackgroundFetchPackage(),
                    new ReactNativePushNotificationPackage(), new KeyaddrPackage(), new RNCameraPackage(),
                    new RNSecureRandomPackage());
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
