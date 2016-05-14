import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {VideoComponent} from './video.component';
@Component({
  selector: 'question',
  template: `
  <div class="row question-header">
    <div class="col-md-5">
      <span class="question-name">Question {{question.position}}</span>
      <a *ngIf="question.audioUrl" class="btn btn-default btn-sm"><i class="fa fa-play" (click)='playSound()'></i></a>
    </div>
    <div class="col-md-7">
      <div class="navigation-buttons pull-right">
        <a class="btn btn-default" (click)="previousQuestion()"><i class="fa fa-caret-left"></i></a>
        <a class="btn btn-default" (click)="nextQuestion()"><i class="fa fa-caret-right"></i></a>
      </div>
    </div>
  </div>

  <div class="row question-content">
    <div class="col-md-12">
      <p>{{ question.question }}</p>

      <img class="img-responsive" *ngIf="question.imageUrl !=''" [src]="question.imageUrl"/>

      <video-cmp [source]="question.videoUrl" [width]="videoWidth" [height]="videoHeight"></video-cmp>
    </div>
  </div>
  `,
  directives: [CORE_DIRECTIVES, VideoComponent]
})
export class QuestionComponent implements OnChanges {
  @Input() question:Question;
  private delay = 500;
  private videoWidth = 320;
  private videoHeight = 240;

  constructor(private gamerService: GameService,
              private soundService: SoundService) {

  }

  ngOnChanges(changes: any) {
    if (changes['question'] && changes['question'] != null) {
      if (this.question.audioUrl && !this.question.videoUrl) {
        this.soundService.play(this.question.audioUrl, this.delay);
      }
    }
  }

  initVideoQuestion() {

  }

  initImageQuestion() {

  }

  playSound() {
    if (this.question.audioUrl && !this.question.videoUrl) {
      this.soundService.play(this.question.audioUrl, this.delay);
    }
  }
}