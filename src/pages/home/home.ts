import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { AudioProvider, CordovaAudioTrack } from 'ionic-audio';

import { CallNumber } from '@ionic-native/call-number';

import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myTracks: any[];
  singleTrack: any;
  allTracks: any[];
  selectedTrack: number;

  constructor(public navCtrl: NavController,
    private _audioProvider: AudioProvider,
    private callNumber: CallNumber,
    private _file: File,
    private _platform: Platform
  ) {
    // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
    this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'assets/img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    },
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'assets/img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }];
  }

  ionViewDidEnter(){
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
    console.log('ionViewDidEnter');
    this.addTrack();
  }

  addTrack(track='recording_1496223333080.m4a') {
    this._file.resolveDirectoryUrl(this._file.dataDirectory)
      .then(dirEntry => {
        let fileEntry = dirEntry.toURL() + track;
        console.log('addTrack', fileEntry);
        this.myTracks.push({
          src: fileEntry,
          artist: track,
          title: track,
          art: 'assets/img/Stephane.jpg',
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
        })
      }, err => {
        console.error('ERROR',err);
      })
      .catch(err => {
        console.error('CATCH ERROR',err);
      })
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

  call(number) {
    this.callNumber.callNumber(number = '18001010101', true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  onRecord(data) {
    // let audio = new CordovaAudioTrack(data.dataDirectory + data.fileName);
    // this._audioProvider.add(audio);
    
    console.log('OnRecord:data.fullpath', data.fullPath);
    console.log('OnRecord:data',data);
    this.addTrack(data.fileName);

    // this.myTracks.push({
    //   src: data.dataDirectory + data.fileName,
    //   artist: data.fileName,
    //   title: data.fileName,
    //   preload: 'none' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    // })

    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // this.recordings.push({
    //   src: data.dataDirectory + data.fileName
    // })
  }
}
