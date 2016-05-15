import {Injectable} from 'angular2/core';

@Injectable()
export class SoundService {
  private _audio: any;

  play(path: string, delay: number) {
    if (this._audio) {
      this._audio.pause();
      delete this._audio;
    }

    this._audio = new Audio(path);

    setTimeout(() => {
      this._audio.play();
    }, delay);

  }
}