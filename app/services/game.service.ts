import {Injectable} from '@angular/core';
import {Question} from '../interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GameService {
  private questionData = data;
  private $questionChange: Observable<Question>;
  private $questionChangeNotifier: any;
  private currentQuestionIndex: number;

  constructor() {
    this.$questionChange = Observable.create((observer:any) => this.$questionChangeNotifier = observer).share();
  }

  getQuestions():Array<Question> {
    return this.questionData;
  }

  submitAnswer(question: Question, answer: string):boolean {
    if (question == null || question.answer == null || answer == null || question.answer.length == 0 || answer.length == 0 ) {
      return false;
    }
  }

  onQuestionChanged(): Observable<Question> {
    return this.$questionChange;
  }

  getCurrentQuestion():Question {
    return this.questionData[this.currentQuestionIndex];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionData.length - 1){
      this.currentQuestionIndex++;
      this.$questionChangeNotifier.next(this.getCurrentQuestion());
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.$questionChangeNotifier.next(this.getCurrentQuestion());
    }
  }

  publishChangeQuestion():Observable<Question> {
    return this.$questionChange;
  }
}

var data:Array<Question> = [{
  question: 'Sample',
  answer: 'Sample',
  type: 'text',
  position : 1,
  videoUrl : '',
  imageUrl : '',
  audioUrl : ''
}];