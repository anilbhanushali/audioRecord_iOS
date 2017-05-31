import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { RecorderModule } from '../components/recorder/recorder.module';
import { IonicAudioModule, AudioProvider, WebAudioProvider, audioProviderFactory } from 'ionic-audio';
import { File } from '@ionic-native/file';
import { MediaPlugin } from '@ionic-native/media';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Sample custom factory function to use with ionic-audio
 */
export function myCustomAudioProviderFactory() {
  return new WebAudioProvider();
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    RecorderModule,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory }),
    // or use custom function above to force a specific provider
    // { provide: AudioProvider, useFactory: myCustomAudioProviderFactory }
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SplashScreen,
    StatusBar,
    File,
    MediaPlugin,
    CallNumber
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
