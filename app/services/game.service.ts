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
  private totalSuccessQuestion:

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
    if (!question || question.answer == null || !answer || question.answer.length == 0 || answer.length == 0 ) {
      return false;
    }

    answer = answer.toLocaleLowerCase();
    var correctAnswer: string = question.answer.toLowerCase();

    if (answer == correctAnswer) {
      alert("answer correct");
      return true;
    }

    return false;
  }

  onQuestionChanged(): Observable<Question> {
    return this.$questionChange;
  }

  getCurrentQuestion():Question {
    return this.questionData[this.currentQuestionIndex];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionData.length - 1) {
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


  publishChangeQuestion() {
    this.$questionChangeNotifier.next(this.getCurrentQuestion());
  }
}

var data:Array<Question> = [

  {
    question: "What's the best song in Lee's mind ",
    answer: 'JPop',
    type: 'text',
    position : 2,
    imageUrl : 'http://img-9gag-fun.9cache.com/photo/a3BONAQ_460s.jpg',
    youtubeVideoId : 'RHXS_ir2-10'
  },
  {
    question: 'Sample',
    answer: 'Sample',
    type: 'text',
    position : 1,
    imageUrl : 'http://img-9gag-fun.9cache.com/photo/a3BONAQ_460s.jpg',
    youtubeVideoId : '3TecLO0It98'
  }

  ];