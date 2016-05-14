import {Component, OnInit, ViewChild} from '@angular/core';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {QuestionComponent} from './question.component';
import {TimerComponent} from './timer.component';
import {AnswerComponent} from './answer.component';
@Component({
  selector: 'play',
  template: `
    <timer></timer>
    <question [question]="question"></question>
    <answer [question]="question"></answer>
  `,
  directives: [QuestionComponent, TimerComponent, AnswerComponent],
  providers: [GameService, TimerService, SoundService]
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
    this.timerService.startTimer();
    this.gameService.nextQuestion();
  }
}