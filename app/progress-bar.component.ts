import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'progress-bar',
  template: `
  <div class="progress">
    <div class="progress-bar" role="progressbar" [ngStyle]="{width: successPercent}>
      <span class="sr-only">{{successPercent}}% Complete</span>
    </div>
  </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class ProgressBarComponent {
  @Input() successPercent: number;

  constructor() {
    this.successPercent = 0;
  }
}