import {Component, OnInit, ViewChild} from '@angular/core';
import {Question} from './interfaces';
import {GameService, TimerService} from './services';

@Component({
  selector: 'play',
  template: `
    <timer></timer>
    <question [question]="question"></question>
    <answer [question]="question" [answer]="answer" (onSubmitAnswer)="onSubmitAnswer()"></answer>
    <progress-bar></progress-bar>
  `
})
export class PlayComponent implements OnInit {
  private question: Question;
  private answer: string;
  private score: number;

  constructor(private gameService: GameService,
              private timerService: TimerService) {

  }

  ngOnInit() {
    this.timerService.startTimer();
    this.question = this.gameService.getCurrentQuestion();

    this.timerService.onTimeEnd().subscribe(() => {
      this.gameService.submitAnswer(this.question, this.answer);
    });

    this.gameService.onQuestionChanged().subscribe((question:Question) => {
      this.question = question;
    })
  }

  private onSubmitAnswer() {
    var result = this.gameService.submitAnswer(this.question, this.answer);
    if (result) {
      this.score += 10;
      alert('You did it!');
    } else {
      alert('You may try again later')
    }
    this.gameService.nextQuestion();
  }
}