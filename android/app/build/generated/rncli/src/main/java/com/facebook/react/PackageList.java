
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @dr.pogodin/react-native-fs
import com.drpogodin.reactnativefs.ReactNativeFsPackage;
// @notifee/react-native
import io.invertase.notifee.NotifeePackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @zegocloud/react-native-callkeep
import io.wazo.callkeep.RNCallKeepPackage;
// @zegocloud/zego-uikit-prebuilt-call-rn
import com.zegouikitprebuiltcallrn.ZegoUIKitPrebuiltCallRNPackage;
// @zegocloud/zego-uikit-rn
import com.zegouikitrn.ZegoUIKitRNPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-encrypted-storage
import com.emeraldsanto.encryptedstorage.RNEncryptedStoragePackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-keep-awake
import com.corbt.keepawake.KCKeepAwakePackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-sha256
import com.sha256lib.Sha256Package;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// zego-express-engine-reactnative
import im.zego.reactnative.RCTZegoExpressEnginePackage;
// zego-zim-react-native
import im.zego.RNZimReactnativeSdkPackage;
// zego-zpns-react-native
import im.zego.zpns_reactnative_sdk.RCTZegoZPNsPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ReactNativeFsPackage(),
      new NotifeePackage(),
      new AsyncStoragePackage(),
      new RNCMaskedViewPackage(),
      new RNCallKeepPackage(),
      new ZegoUIKitPrebuiltCallRNPackage(),
      new ZegoUIKitRNPackage(),
      new LottiePackage(),
      new RNEncryptedStoragePackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new KCKeepAwakePackage(),
      new LinearGradientPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new Sha256Package(),
      new RNSoundPackage(),
      new VectorIconsPackage(),
      new RCTZegoExpressEnginePackage(),
      new RNZimReactnativeSdkPackage(),
      new RCTZegoZPNsPackage()
    ));
  }
}
