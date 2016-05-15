import {Injectable} from 'angular2/core';

@Injectable()
export class SoundService {
  private _audio: any;

  play(path: string, delay: number) {
    if (this._audio) {
      delete this._audio;
    }


      this._audio = new Audio(path);
      this._audio.play();
      // setTimeout(() => {

      // }, delay);

  }
}