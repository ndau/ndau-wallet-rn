//package com.ndauwalletrn;
//
//import android.graphics.drawable.Drawable;
//import android.support.v4.content.ContextCompat;
//import android.widget.LinearLayout;
//
//import com.reactnativenavigation.controllers.SplashActivity;
//
//public class MainActivity extends SplashActivity {
//    @Override
//    public LinearLayout createSplashLayout() {
//        LinearLayout splash = new LinearLayout(this);
//        Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(),R.drawable.launch_screen_bitmap);
//        splash.setBackground(launch_screen_bitmap);
//
//        return splash;
//
//    }
//}
package com.ndauwalletrn;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ndauwalletrn";
    }
}
