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
    if (!question || question.answer == null || !answer || question.answer.length == 0 || answer.length == 0 ) {
      return false;
    }

    answer = answer.toLocaleLowerCase();
    var correctAnswer: string = question.answer.toLowerCase();

    if (answer == correctAnswer) {
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
  },
  {
    question: '1-6',
    answer: '',
    type: 'text',
    position: 6,
    imageUrl: '',
    youtubeVideoId: '7WAQOUE74sk'
  },
  {
    question: '1-7',
    answer: '',
    type: 'text',
    position: 7,
    imageUrl: '',
    youtubeVideoId: 'n4YaDxr73HI'
  },
  {
    question: '1-8',
    answer: '',
    type: 'text',
    position: 8,
    imageUrl: '',
    youtubeVideoId: 'bGW_2hJrLVY'
  },
  {
    question: '1-9',
    answer: '',
    type: 'text',
    position: 9,
    imageUrl: '',
    youtubeVideoId: '3sU4_fmPDMo'
  },
  {
    question: '1-10',
    answer: '',
    type: 'text',
    position: 10,
    imageUrl: '',
    youtubeVideoId: 'eqOvWOr9ayw'
  },
  ];