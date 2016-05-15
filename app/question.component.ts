import {Component, Input, OnChanges, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {YoutubeComponent} from './youtube.component';
import {TimerComponent} from './timer.component';

@Component({
  selector: 'question',
  template: `
  <div class='question-component' *ngIf="question">
    <div class="row question-header">
      <div class="col-md-5">
        <span class="question-name">Question {{question.position}}</span>
        <a *ngIf="question.audioUrl" class="btn btn-default btn-sm" (click)='play()'><i class="fa fa-play"></i></a>
      </div>
      <div class="col-md-7">
        <div class="navigation-buttons pull-right">
          <timer class="pull-right"></timer>
        </div>
      </div>
    </div>

    <div class="row question-content">
      <div class="col-md-12">
        <p>{{ question.question }}</p>

        <img class="img-responsive" *ngIf="question.imageUrl !=''" [src]="question.imageUrl"/>

        <youtube-cmp [source]="question.youtubeVideoId" [width]="videoWidth" [height]="videoHeight" *ngIf="question.youtubeVideoId" [delay]="delay"></youtube-cmp>
      </div>
    </div>
  </div>
  `,
  directives: [CORE_DIRECTIVES, YoutubeComponent, TimerComponent]
})
export class QuestionComponent implements OnChanges {
  @ViewChild(YoutubeComponent) videoPlayer:YoutubeComponent;
  @Input('question') question:Question;
  private delay = 500;
  private videoWidth = 320;
  private videoHeight = 240;

  constructor(private gamerService: GameService,
              private soundService: SoundService) {

  }

  ngOnChanges(changes: any) {
    this.play();
    console.log(this.question);
  }

  play() {
    // if (this.question.audioUrl != '') {
    //   this.soundService.play(this.question.audioUrl, this.delay);
    // }

    if (this.videoPlayer && this.question.youtubeVideoId) {
      this.videoPlayer.playVideo();
    }
  }

  previousQuestion() {
    this.gamerService.previousQuestion();
  }

  nextQuestion() {
    this.gamerService.nextQuestion();

  }
}