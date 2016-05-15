import {Injectable} from 'angular2/core';

@Injectable()
export class SoundService {
  private _audio: any;

  play(path: string, delay: number) {
    if (this._audio) {
      delete this._audio;
    }

    this._audio = new Audio(path);

    setTimeout(() => {
      try{
        this._audio.play();
      }
      catch(e) {

      }

    }, delay);

  }
}