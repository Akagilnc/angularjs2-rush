import {Component, OnInit, ViewChild} from 'angular2/core';
import {Question} from './interfaces';
import {GameService, TimerService, SoundService} from './services';
import {QuestionComponent} from './question.component';
import {AnswerComponent} from './answer.component';
import {ProgressBarComponent} from './progress-bar.component';
import {ModalComponent} from './modal.component';
import {AppSettings} from './app-settings';

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
  constructor(private gameService: GameService,
              private timerService: TimerService) {

  }

  ngOnInit() {
    //this.timerService.startTimer();
    this.question = this.gameService.getCurrentQuestion();

    this.timerService.onTimeEnd().subscribe(() => {
      //this.answerComponent.submitAnswer();
    });

    this.gameService.onQuestionChanged().subscribe((question:Question) => {
      this.question = question;
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
    this.resultModal.open();
  }

  closeModalAndNextLevel() {
    this.resultModal.close();
    this.gameService.nextQuestion();
    //this.timerService.startTimer();
  }

  showCharacterList() {
    this.characterList.open();
  }

}