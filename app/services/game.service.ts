import {Injectable} from '@angular/core';
import {Question} from '../interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GameService {
  private questionData = data;
  private $questionChange: Observable<Question>;
  private $questionChangeNotifier: any;
  private currentQuestionIndex: number = 0;

  constructor() {
    this.$questionChange = Observable.create((observer:any) => {
      this.$questionChangeNotifier = observer;
      this.publishChangeQuestion();
    }).share();

  }

  getQuestions():Array<Question> {
    return this.questionData;
  }

  submitAnswer(question: Question, answer: string):boolean {
    throw new Error("not implemented");
  }

  onQuestionChanged(): Observable<Question> {
    return this.$questionChange;
  }

  getCurrentQuestion():Question {
    return this.questionData[this.currentQuestionIndex];
  }

  nextQuestion() {
    throw new Error("not implemented");
  }

  previousQuestion() {
    throw new Error("not implemented");
  }

  publishChangeQuestion() {
    this.$questionChangeNotifier.next(this.getCurrentQuestion());
  }
}

var data:Array<Question> = [{
  question: 'Sample',
  answer: 'Sample',
  type: 'text',
  position : 1,
  videoUrl : 'http://img-9gag-fun.9cache.com/photo/a8MxWEY_460sv.mp4',
  imageUrl : 'http://img-9gag-fun.9cache.com/photo/a3BONAQ_460s.jpg',
  audioUrl : ''
}];