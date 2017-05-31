import { Component, EventEmitter, Output } from '@angular/core';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
  selector: 'recorder',
  templateUrl: 'recorder.html'
})
export class Recorder {

  @Output() onRecordComplete = new EventEmitter();

  text: string;
  state: AudioRecorderState = AudioRecorderState.Ready;
  audioFile: MediaObject;
  fileSrc: string;
  fileName: string;

  constructor(
    private alertCtrl: AlertController,
    private media: MediaPlugin,
    private file: File) {
    this.text = 'Start Recording';
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  onFileStatusUpdate(status) {
    console.log(status);
  }

  onFileCreateSuccess = (result) => {
    console.log('onFileCreateSuccess', result);
  }

  onFileCreateError(error) {
    console.error(error);
  }

  getFile() {
    this.fileName = `recording_${Date.now()}.m4a`;
    this.fileSrc = `../tmp/${this.fileName}`; //This is for iOS //TODO for android;
  }

  startRecording() {
    this.state = AudioRecorderState.Recording;
    this.text = "Stop Recording";
    this.getFile();
    console.log('fileSrc', this.fileSrc);
    try {
      this.audioFile = this.media.create(
        this.fileSrc,
        this.onFileStatusUpdate,
        this.onFileCreateSuccess,
        this.onFileCreateError);
      this.audioFile.startRecord();
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  sendOutput() {
    this.file.readAsDataURL(this.file.tempDirectory, this.fileName).then((result) => {
      this.file.copyFile(this.file.tempDirectory, this.fileName,
        this.file.dataDirectory, this.fileName)
        .then(entry => {
          this.onRecordComplete.emit({
            media: this.audioFile,
            fullPath: entry.toURL(),
            dataDirectory: this.file.dataDirectory,
            fileName: this.fileName,
            dataURL: result
          });
        })
        .catch(err => console.log('ERROR COPYING FILE'))
    }, (error) => {
      console.error('readAsDataURL', error);
    }).catch(err => console.error(err));
  }

  stopRecording() {
    try {
      this.audioFile.stopRecord();
      this.audioFile.release();
      //this.audioFile.play();
      this.state = AudioRecorderState.Ready;
      this.text = "Start Recording";
      this.sendOutput();
    }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
  }

  startOrStopRecording() {
    switch (this.state) {
      case AudioRecorderState.Ready:
        this.startRecording();
        break;
      case AudioRecorderState.Recording:
        this.stopRecording();
        break;
      default:
        break;
    }
    return;
  }

}

export enum AudioRecorderState {
  Ready,
  Recording,
  Recorded,
  Playing
}
