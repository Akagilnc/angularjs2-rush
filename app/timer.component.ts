import {Component} from 'angular2/core';
import {TimerService} from './services';

@Component({
  selector: 'timer',
  template: `
    <div class="timer">
      <i class="fa fa-clock-o"></i>&nbsp;{{remaningTime}}
    </div>`
})
export class TimerComponent {
  private remaningTime: number;

  constructor(private timerService: TimerService) {
    this.remaningTime = 0;
    timerService.onTick().subscribe((remainingTime:number) => this.remaningTime = remainingTime);
  }
}