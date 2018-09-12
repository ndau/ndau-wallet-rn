//package com.ndauwalletrn;
//
//import android.support.annotation.Nullable;
//import org.reactnative.camera.RNCameraPackage;
//
//import com.facebook.react.ReactPackage;
//import com.reactnativenavigation.NavigationApplication;
//import com.oblador.vectoricons.VectorIconsPackage;
//
//import java.util.Arrays;
//import java.util.List;
//
//import com.github.wumke.RNExitApp.RNExitAppPackage;
//import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
//
//public class MainApplication extends NavigationApplication {
//    @Override
//    public boolean isDebug() {
//        return BuildConfig.DEBUG;
//    }
//
//    @Nullable
//    @Override
//    public List<ReactPackage> createAdditionalReactPackages() {
//        return Arrays.<ReactPackage>asList(
//                new VectorIconsPackage(),
//                new KeyaddrPackage(),
//                new RNCameraPackage(),
//                new RNExitAppPackage(),
//                new RNSecureRandomPackage()
//        );
//    }
//
//    @Nullable
//    @Override
//    public String getJSMainModuleName() {
//        return "index";
//    }
//}
//
package com.ndauwalletrn;

import android.app.Application;

import com.facebook.react.ReactApplication;
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
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new VectorIconsPackage(),
                new KeyaddrPackage(),
                new RNCameraPackage(),
                new RNExitAppPackage(),
                new RNSecureRandomPackage()
            );
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
