import {Component, OnInit, ViewChild} from 'angular2/core';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {QuestionComponent} from './question.component';
import {AnswerComponent} from './answer.component';
import {ProgressBarComponent} from './progress-bar.component';
import {ModalComponent} from './modal.component';
import {AppSettings} from './app-settings';
import {Router} from 'angular2/router';
@Component({
  selector: 'play',
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="pull-right user-score">
          Your score: {{score}}
        </div>
      </div>
    </div>
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

    <modal  #resultModal
            [title]="appTitle"
            [submitButtonLabel]="modalSubmitButtonLabel"
            [modalClass]="modalClass"
            [hideCloseButton]="false"
            [closeOnEscape]="false"
            [closeOnOutsideClick]="false"
            (onSubmit)="closeModalAndNextLevel()">

            <modal-content> {{resultText}} </modal-content>

     </modal>



  `,
  directives: [QuestionComponent, AnswerComponent, ProgressBarComponent, ModalComponent],
  providers: [GameService, TimerService, SoundService]
})
export class PlayComponent implements OnInit {
  @ViewChild(AnswerComponent) answerComponent:AnswerComponent;
  @ViewChild('characterList') characterList: ModalComponent;
  @ViewChild('resultModal') resultModal: ModalComponent;
  private question: Question;
  private answer: string;
  private completedPercent: number;
  private resultText: string = '';

  private appTitle = AppSettings.TITLE;
  private modalSubmitButtonLabel = 'Next question';

  private modalClass = 'modal-sm';
  private score:number = 0;
  constructor(private gameService: GameService,
              private timerService: TimerService,
              private router: Router) {

  }

  ngOnInit() {
    //this.timerService.startTimer();
    this.question = this.gameService.getCurrentQuestion();

    this.timerService.onTimeEnd().subscribe(() => {
      //this.answerComponent.submitAnswer();
    });

    this.gameService.onQuestionChanged().subscribe((question:Question) => {
      this.question = question;
      this.completedPercent = this.gameService.getCompletedPercent();
    })
  }

  onSubmitAnswer(answer:string) {
    console.log(this.question, this.answer, answer);
    var result = this.gameService.submitAnswer(this.question, answer);
    if (result) {
      this.resultText = 'Your answer is correct.';
    } else {
      this.resultText = 'Your answer is NOT correct.';
    }
    this.completedPercent = this.gameService.getCompletedPercent();
    this.score = this.gameService.getScore();
    this.resultModal.open();
  }

  closeModalAndNextLevel() {
    this.resultModal.close();
    if (this.gameService.isLastQuestion()) {
      this.router.navigate(['Thankyou']);
    } else {
      this.gameService.nextQuestion();
    }

    //this.timerService.startTimer();
  }

  showCharacterList() {
    this.characterList.open();
  }

}