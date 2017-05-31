import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Recorder } from './recorder';
import { MediaPlugin } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    Recorder,
  ],
  imports: [
    IonicPageModule.forChild(Recorder),
  ],
  providers:[
    MediaPlugin,
    File
  ],
  exports: [
    Recorder
  ]
})
export class RecorderModule {}
