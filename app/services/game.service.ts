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
    throw new Error("not implemented");
  }

  onQuestionChanged(): Observable<Question> {
    throw new Error("not implemented");
  }

  getCurrentQuestion():Question {
    throw new Error("not implemented");
  }

  nextQuestion() {
    throw new Error("not implemented");
  }

  previousQuestion() {
    throw new Error("not implemented");
  }

  publishChangeQuestion() {
    throw new Error("not implemented");
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