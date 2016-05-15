import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TimerService {

  private TOTAL_TIME:number = 120;
  private remaningTime: number = 0;

  private $onTimeEnd: any;
  private $onTimeEndBroadcast: any;

  private $onTick: any;
  private $onTickBroadcaster: any;

  private timer:any;

  constructor() {
    this.$onTimeEnd = Observable.create((observer:any) => this.$onTimeEndBroadcast = observer).share();
    this.$onTick = Observable.create((observer:any) => this.$onTickBroadcaster = observer).share();
  }

  onTimeEnd() {
    return this.$onTimeEnd;
  }

  onTick() {
    return this.$onTick;
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.remaningTime = this.TOTAL_TIME;
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    this.remaningTime--;

    this.broadcastTick();

    if (this.remaningTime == 0) {
      clearInterval(this.timer);
      this.broadcastTimeEnd();
    }
  }

  private broadcastTick() {
    this.$onTickBroadcaster.next(this.remaningTime);
  }

  private broadcastTimeEnd() {
    this.$onTimeEndBroadcast.next(0);
  }

}