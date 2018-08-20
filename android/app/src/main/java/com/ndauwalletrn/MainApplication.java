package com.ndauwalletrn;

import android.support.annotation.Nullable;
import org.reactnative.camera.RNCameraPackage;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

import com.github.wumke.RNExitApp.RNExitAppPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new VectorIconsPackage(),
                new KeyaddrPackage(),
                new RNCameraPackage(),
                new RNExitAppPackage(),
                new RNSecureRandomPackage()
        );
    }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}

