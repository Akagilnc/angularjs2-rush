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
  private totalSuccessQuestion: number = 0;
  private totalCompletedQuestion: number = 0;

  constructor() {
    this.$questionChange = Observable.create((observer:any) => {
      this.$questionChangeNotifier = observer;
      this.publishChangeQuestion();
    }).share();

    this.totalSuccessQuestion = 0;
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

    this.totalCompletedQuestion++;
    if (answer == correctAnswer) {
      this.totalSuccessQuestion++;
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

  getCompletedPercent() {
    return Math.floor((this.totalCompletedQuestion / this.questionData.length) * 100);
  }

  getScore() {
    return this.totalSuccessQuestion * 10;
  }
}

var data:Array<Question> = [

  {
    question: "nu",
    answer: 'ぬ',
    displayAnswer: '',
    type: 'text',
    position : 1,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "to",
    answer: 'と',
    displayAnswer: '',
    type: 'text',
    position : 2,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "u",
    answer: 'う',
    displayAnswer: '',
    type: 'text',
    position : 3,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "ne",
    answer: 'ね',
    displayAnswer: '',
    type: 'text',
    position : 4,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "su",
    answer: 'す',
    displayAnswer: '',
    type: 'text',
    position : 5,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: 'i-nu',
    answer: 'いぬ',
    displayAnswer: '',
    type: 'text',
    position: 6,
    imageUrl: '',
    youtubeVideoId: '7WAQOUE74sk'
  },
  {
    question: 'to-ri',
    answer: 'とり',
    displayAnswer: '',
    type: 'text',
    position: 7,
    imageUrl: '',
    youtubeVideoId: 'n4YaDxr73HI'
  },
  {
    question: 'u-ma',
    answer: 'うま',
    displayAnswer: '',
    type: 'text',
    position: 8,
    imageUrl: '',
    youtubeVideoId: 'bGW_2hJrLVY'
  },
  {
    question: 'ne-ko',
    answer: 'ねこ',
    displayAnswer: '',
    type: 'text',
    position: 9,
    imageUrl: '',
    youtubeVideoId: '3sU4_fmPDMo'
  },
  {
    question: 'ri-su',
    answer: 'りす',
    displayAnswer: '',
    type: 'text',
    position: 10,
    imageUrl: '',
    youtubeVideoId: 'eqOvWOr9ayw'
  },
  {
    question: "na",
    answer: 'な',
    displayAnswer: '',
    type: 'text',
    position : 11,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "mi",
    answer: 'み',
    displayAnswer: '',
    type: 'text',
    position : 12,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "e",
    answer: 'え',
    displayAnswer: '',
    type: 'text',
    position : 13,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "tsu",
    answer: 'つ',
    displayAnswer: '',
    type: 'text',
    position : 14,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "gi",
    answer: 'ぎ',
    displayAnswer: '',
    type: 'text',
    position : 15,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: 'ka-ka-na',
    answer: 'さかな',
    displayAnswer: '',
    type: 'text',
    position: 16,
    imageUrl: '',
    youtubeVideoId: 'Ha_VUkhZQHU'
  },
  {
    question: 'ne-zu-mi',
    answer: 'ねずみ',
    displayAnswer: '',
    type: 'text',
    position: 17,
    imageUrl: '',
    youtubeVideoId: '1QDTjlLcmYM'
  },
  {
    question: 'ka-e-ru',
    answer: 'かえる',
    displayAnswer: '',
    type: 'text',
    position: 18,
    imageUrl: '',
    youtubeVideoId: 'kc6E_AkDiyo'
  },
  {
    question: 'ke-tsu-ne',
    answer: 'きつね',
    displayAnswer: '',
    type: 'text',
    position: 19,
    imageUrl: '',
    youtubeVideoId: '1SvbmghDFxw'
  },
  {
    question: 'u-sa-gi',
    answer: 'うさぎ',
    displayAnswer: '',
    type: 'text',
    position: 20,
    imageUrl: '',
    youtubeVideoId: 'Jsnc05_kiUA'
  },
  {
    question: "be",
    answer: 'べ',
    displayAnswer: '',
    type: 'text',
    position: 21,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ya",
    answer: 'や',
    displayAnswer: '',
    type: 'text',
    position: 22,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "shi",
    answer: 'し',
    displayAnswer: '',
    type: 'text',
    position: 23,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "wa",
    answer: 'わ',
    displayAnswer: '',
    type: 'text',
    position: 24,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ta",
    answer: 'た',
    displayAnswer: '',
    type: 'text',
    position: 25,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: 'ta-be-mo-no',
    answer: 'たべもの',
    displayAnswer: '',
    type: 'text',
    position: 26,
    imageUrl: 'app/assets/q3-6food.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-6food.mp3'
  },
  {
    question: 'ya-ki-to-ri',
    answer: 'やきとり',
    displayAnswer: '',
    type: 'text',
    position: 27,
    imageUrl: 'app/assets/q3-7yakitori.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-7yakitori.mp3'
  },
  {
    question: 'o-i-shi-i',
    answer: 'おいしい',
    displayAnswer: '',
    type: 'text',
    position: 28,
    imageUrl: 'app/assets/q3-8tasty.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-8tasty.mp3'
  },
  {
    question: 'ka-wa-i-i',
    answer: 'かわいい',
    displayAnswer: '',
    type: 'text',
    position: 29,
    imageUrl: 'app/assets/q3-9cute.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-9cute.mp3'
  },
  {
    question: 'ta-no-shi-i',
    answer: 'たのしい',
    displayAnswer: '',
    type: 'text',
    position: 30,
    imageUrl: 'app/assets/q3-10fun.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-10fun.mp3'
  },

];