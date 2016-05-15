import {Component, Input, OnChanges} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'progress-bar',
  template: `
  <div class="progress">
    <div class="progress-bar" role="progressbar" [ngStyle]="{width: percentString}">
      <span class="sr-only">{{percentString}} Complete</span>
    </div>
  </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class ProgressBarComponent implements OnChanges{
  @Input() completedPercent: number;
  private percentString: string = '';

  constructor() {
    this.completedPercent = 0;
    this.percentString = '';
  }

  ngOnChanges(changes:any) {
    if (this.completedPercent) {
      this.percentString = this.completedPercent.toString() + '%'
    }

  }


}