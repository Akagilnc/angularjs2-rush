import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

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