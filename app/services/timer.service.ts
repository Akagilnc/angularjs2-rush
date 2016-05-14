import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TimerService {

  private TOTAL_TIME:number = 40;
  private remaningTime: number = 0;

  private $onTimeEnd: any;
  private $onTimeEndBroadcast: any;

  constructor() {
    this.$onTimeEnd = Observable.create((observer:any) => this.$onTimeEndBroadcast = observer).share();
  }

  onTimeEnd() {
    return this.$onTimeEnd;
  }

  startTimer() {
    this.remaningTime = this.TOTAL_TIME;
    setTimeout(this.tick, 1000);
  }

  tick() {
    this.remaningTime--;
    if (this.remaningTime == 0) {
      this.broadcastTimeEnd();
    }
  }

  private broadcastTimeEnd() {
    this.$onTimeEndBroadcast.next(0);
  }

}