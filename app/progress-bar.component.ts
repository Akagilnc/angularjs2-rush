import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'progress-bar',
  template: `
  <div class="progress">
    <div class="progress-bar" role="progressbar" [ngStyle]="{width: completedPercent}">
      <span class="sr-only">{{completedPercent}}% Complete</span>
    </div>
  </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class ProgressBarComponent {
  @Input() completedPercent: number;

  constructor() {
    this.completedPercent = 0;
  }
}