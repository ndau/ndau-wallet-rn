package com.ndauwalletrn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
import org.reactnative.camera.RNCameraPackage;

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
            return Arrays.<ReactPackage>asList(new MainReactPackage(), new VectorIconsPackage(),
                    new RNSecureRandomPackage(), new RNExitAppPackage(), new RNCameraPackage(),
                    new VectorIconsPackage(), new KeyaddrPackage(), new RNCameraPackage(), new RNExitAppPackage(),
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
