import {Component, OnInit, ViewChild} from '@angular/core';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {QuestionComponent} from './question.component';
import {AnswerComponent} from './answer.component';
@Component({
  selector: 'play',
  template: `
    <div class="row">
      <div class="col-md-12">
        <question [question]="question"></question>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <answer [question]="question" [answer]="answer" (onSubmitAnswer)="onSubmitAnswer()"></answer>
      </div>
    </div>
  `,
  directives: [QuestionComponent, AnswerComponent],
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
      this.onSubmitAnswer();
    });

    this.gameService.onQuestionChanged().subscribe((question:Question) => {
      this.question = question;
    })
  }

  onSubmitAnswer() {
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