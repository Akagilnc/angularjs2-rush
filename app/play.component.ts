import {Component, OnInit, ViewChild} from 'angular2/core';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {QuestionComponent} from './question.component';
import {AnswerComponent} from './answer.component';
import {ProgressBarComponent} from './progress-bar.component';
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
        <answer [question]="question" [answer]="answer" (onSubmitAnswer)="onSubmitAnswer($event)"></answer>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <progress-bar [completedPercent]="completedPercent"></progress-bar>
      </div>
    </div>
  `,
  directives: [QuestionComponent, AnswerComponent, ProgressBarComponent],
  providers: [GameService, TimerService, SoundService]
})
export class PlayComponent implements OnInit {
  @ViewChild(AnswerComponent) answerComponent:AnswerComponent;
  private question: Question;
  private answer: string;
  private completedPercent: number;

  constructor(private gameService: GameService,
              private timerService: TimerService) {

  }

  ngOnInit() {
    this.timerService.startTimer();
    this.question = this.gameService.getCurrentQuestion();

    this.timerService.onTimeEnd().subscribe(() => {
      this.answerComponent.submitAnswer();
    });

    this.gameService.onQuestionChanged().subscribe((question:Question) => {
      this.question = question;
    })
  }

  onSubmitAnswer(answer:string) {
    console.log(this.question, this.answer, answer);
    var result = this.gameService.submitAnswer(this.question, answer);
    if (result) {
      alert('Your answer is correct. Click to go to next question!');
    } else {
      alert('Your answer is NOT correct. Click to go to next question!')
    }
    this.completedPercent = this.gameService.getCompletedPercent();
    this.timerService.startTimer();
    this.gameService.nextQuestion();
  }

}