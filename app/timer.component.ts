import {Component} from '@angular/core';
import {TimerService} from './services';

@Component({
  selector: 'timer',
  template: `<i class="fa fa-clock-o"></i>&nbsp;{{remaningTime}}`
})
export class TimerComponent {
  private remaningTime: number;

  constructor(private timerService: TimerService) {
    this.remaningTime = 0;
    timerService.onTick().subscribe((remainingTime:number) => this.remaningTime = remainingTime);
  }
}