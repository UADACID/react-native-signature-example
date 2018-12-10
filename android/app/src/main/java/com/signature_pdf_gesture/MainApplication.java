package com.signature_pdf_gesture;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ui.fileselector.RNFileSelectorPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.hopding.pdflib.PDFLibPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
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
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFileSelectorPackage(),
            new RNViewShotPackage(),
            new RNFSPackage(),
            new ReactNativeDocumentPicker(),
            new PDFLibPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new RSSignatureCapturePackage()
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
