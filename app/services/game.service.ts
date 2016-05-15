import {Injectable} from 'angular2/core';
import {Question} from '../interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GameService {
  private questionData: Array<Question>;
  private $questionChange: Observable<Question>;
  private $questionChangeNotifier: any;
  private currentQuestionIndex: number = 0;
  private totalSuccessQuestion: number = 0;
  private totalCompletedQuestion: number = 0;
  private score: number = 0;

  constructor() {
    this.$questionChange = Observable.create((observer:any) => {
      this.$questionChangeNotifier = observer;
      this.publishChangeQuestion();
    }).share();

    this.totalSuccessQuestion = 0;

    data.forEach((question, index) => {
      question.position = index + 1;
      question.isAnswered = false;
    });

    this.questionData = data;
  }



  getQuestions():Array<Question> {
    return this.questionData;
  }

  submitAnswer(question: Question, answer: string):boolean {
    this.totalCompletedQuestion++;
    if (!question || question.answer == null || !answer || question.answer.length == 0 || answer.length == 0 ) {
      return false;
    }

    answer = answer.toLowerCase();
    var correctAnswer: string = question.answer.toLowerCase();

    if (answer == correctAnswer && !question.isAnswered) {
      question.isAnswered = true;
      this.totalSuccessQuestion++;
      this.score += 10;
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
    return this.score;
  }
}

var data:Array<Question> = [
  {
    question: "nu",
    answer: 'ぬ',
    displayAnswer: 'な, に, ぬ, ね, の',
    type: 'text',
    position : 1,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "to",
    answer: 'と',
    displayAnswer: 'た,ち,つ,て,と',
    type: 'text',
    position : 2,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "u",
    answer: 'う',
    displayAnswer: 'あ, い, う, え, お',
    type: 'text',
    position : 3,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "ne",
    answer: 'ね',
    displayAnswer: 'な,に,ぬ,ね,の',
    type: 'text',
    position : 4,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "su",
    answer: 'す',
    displayAnswer: 'さ, し, す, せ, そ',
    type: 'text',
    position : 5,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: 'i-nu',
    questionNode: 'dog',
    answer: 'いぬ',
    displayAnswer: 'い, に, ぬ, ね, の',
    type: 'text',
    position: 6,
    imageUrl: '',
    youtubeVideoId: '7WAQOUE74sk'
  },
  {
    question: 'to-ri',
    questionNode: 'bird',
    answer: 'とり',
    displayAnswer: 'た,ち,り,て,と',
    type: 'text',
    position: 7,
    imageUrl: '',
    youtubeVideoId: 'n4YaDxr73HI'
  },
  {
    question: 'u-ma',
    questionNode: 'horse',
    answer: 'うま',
    displayAnswer: 'あ, ま, う, え, お',
    type: 'text',
    position: 8,
    imageUrl: '',
    youtubeVideoId: 'bGW_2hJrLVY'
  },
  {
    question: 'ne-ko',
    questionNode: 'cat',
    answer: 'ねこ',
    displayAnswer: 'な,に,こ,ね,の',
    type: 'text',
    position: 9,
    imageUrl: '',
    youtubeVideoId: '3sU4_fmPDMo'
  },
  {
    question: 'ri-su',
    questionNode: 'squirrel',
    answer: 'りす',
    displayAnswer: 'さ, り, す, せ, そ',
    type: 'text',
    position: 10,
    imageUrl: '',
    youtubeVideoId: 'eqOvWOr9ayw'
  },
  {
    question: "na",
    answer: 'な',
    displayAnswer: 'な,に,ぬ,ね,の',
    type: 'text',
    position : 11,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "mi",
    answer: 'み',
    displayAnswer: 'ま,み,む,め,も',
    type: 'text',
    position : 12,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "e",
    answer: 'え',
    displayAnswer: 'あ, い, う, え, お',
    type: 'text',
    position : 13,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "tsu",
    answer: 'つ',
    displayAnswer: 'た,ち,つ,て,と',
    type: 'text',
    position : 14,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: "gi",
    answer: 'ぎ',
    displayAnswer: 'が, ぎ, ぐ, げ, ご',
    type: 'text',
    position : 15,
    imageUrl : '',
    youtubeVideoId : ''
  },
  {
    question: 'ka-ka-na',
    questionNode: 'fish',
    answer: 'さかな',
    displayAnswer: 'な,に,さ,か,の',
    type: 'text',
    position: 16,
    imageUrl: '',
    youtubeVideoId: 'Ha_VUkhZQHU'
  },
  {
    question: 'ne-zu-mi',
    questionNode: 'mouse',
    answer: 'ねずみ',
    displayAnswer: 'ま,み,む,ね,ず',
    type: 'text',
    position: 17,
    imageUrl: '',
    youtubeVideoId: '1QDTjlLcmYM'
  },
  {
    question: 'ka-e-ru',
    questionNode: 'frog',
    answer: 'かえる',
    displayAnswer: 'あ, か, う, え, る',
    type: 'text',
    position: 18,
    imageUrl: '',
    youtubeVideoId: 'kc6E_AkDiyo'
  },
  {
    question: 'ke-tsu-ne',
    questionNode: 'fox',
    answer: 'きつね',
    displayAnswer: 'た,ね,つ,て,き',
    type: 'text',
    position: 19,
    imageUrl: '',
    youtubeVideoId: '1SvbmghDFxw'
  },
  {
    question: 'u-sa-gi',
    questionNode: 'rabbit',
    answer: 'うさぎ',
    displayAnswer: 'が, ぎ, ぐ,う,さ',
    type: 'text',
    position: 20,
    imageUrl: '',
    youtubeVideoId: 'Jsnc05_kiUA'
  },
  {
    question: "be",
    answer: 'べ',
    displayAnswer: 'ば,び,ぶ,べ,ぼ',
    type: 'text',
    position: 21,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ya",
    answer: 'や',
    displayAnswer: 'や,ゆ,よ,え,お',
    type: 'text',
    position: 22,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "shi",
    answer: 'し',
    displayAnswer: 'さ,し,す,せ,そ',
    type: 'text',
    position: 23,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "wa",
    answer: 'わ',
    displayAnswer: 'わ,を,ぷ,ぺ,ぽ',
    type: 'text',
    position: 24,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ta",
    answer: 'た',
    displayAnswer: 'た,ち,つ,て,と',
    type: 'text',
    position: 25,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: 'ta-be-mo-no',
    questionNode: 'food',
    answer: 'たべもの',
    displayAnswer: 'の,た,も,べ,ぼ',
    type: 'text',
    position: 26,
    imageUrl: 'app/assets/q3-6food.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-6food.mp3'
  },
  {
    question: 'ya-ki-to-ri',
    questionNode: 'yakitori',
    answer: 'やきとり',
    displayAnswer: 'や,き,り,と,お',
    type: 'text',
    position: 27,
    imageUrl: 'app/assets/q3-7yakitori.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-7yakitori.mp3'
  },
  {
    question: 'o-i-shi-i',
    questionNode: 'tasty',
    answer: 'おいしい',
    displayAnswer: 'し,す,い,お,せ',
    type: 'text',
    position: 28,
    imageUrl: 'app/assets/q3-8tasty.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-8tasty.mp3'
  },
  {
    question: 'ka-wa-i-i',
    questionNode: 'cute',
    answer: 'かわいい',
    displayAnswer: 'わ,を,い,ぽ,か',
    type: 'text',
    position: 29,
    imageUrl: 'app/assets/q3-9cute.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-9cute.mp3'
  },
  {
    question: 'ta-no-shi-i',
    questionNode: 'fun',
    answer: 'たのしい',
    displayAnswer: 'い,た,の,し,と',
    type: 'text',
    position: 30,
    imageUrl: 'app/assets/q3-10fun.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q3-10fun.mp3'
  },
  {
    question: "hi",
    answer: 'ひ',
    displayAnswer: 'は,ひ,ふ,へ,ほ',
    type: 'text',
    position: 31,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ra",
    answer: 'ら',
    displayAnswer: 'ら,り,る,れ,ろ',
    type: 'text',
    position: 32,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "yo",
    answer: 'よ',
    displayAnswer: 'や,ゆ,よ,あ,い',
    type: 'text',
    position: 33,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "so",
    answer: 'そ',
    displayAnswer: 'さ,し,す,せ,そ',
    type: 'text',
    position: 34,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ma",
    answer: 'ま',
    displayAnswer: 'ま,み,む,め,も',
    type: 'text',
    position: 35,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: 'hi-ra-ga-na',
    questionNode: 'hiragana',
    answer: 'ひらがな',
    displayAnswer: 'ら,ひ,な,が,は',
    type: 'text',
    position: 36,
    imageUrl: 'app/assets/q4-6hiragana.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q4-6food.mp3'
  },
  {
    question: 'yo-u-ko-so',
    questionNode: 'welcome',
    answer: 'ようこそ',
    displayAnswer: 'う,こよ,る,そ',
    type: 'text',
    position: 37,
    imageUrl: 'app/assets/q4-7welcome.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q4-7welcome.mp3'
  },
  {
    question: 'ko-n-ni-chi-wa',
    questionNode: 'hello',
    answer: 'こんにちは',
    displayAnswer: 'こ,は,ん,ち,に',
    type: 'text',
    position: 38,
    imageUrl: 'app/assets/q4-8hello.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q4-8hello.mp3'
  },
  {
    question: 'sa-yo-u-na-ra',
    questionNode: 'good bye',
    answer: 'さようなら',
    displayAnswer: 'よ,さ,な,ら,う',
    type: 'text',
    position: 39,
    imageUrl: 'app/assets/q4-9goodbye.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q4-9goodbye.mp3'
  },
  {
    question: 'su-mi-ma-se-n',
    questionNode: 'excuse me',
    answer: 'すみません',
    displayAnswer: 'す,せ,ま,ん,み',
    type: 'text',
    position: 40,
    imageUrl: 'app/assets/q4-10excuseme.jpg',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q4-10excuseme.mp3'
  },
  {
    question: "go",
    answer: 'ご',
    displayAnswer: 'が, ぎ, ぐ, げ, ご',
    type: 'text',
    position: 41,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "za",
    answer: 'ざ',
    displayAnswer: 'ざ, じ, ず, ぜ, ぞ',
    type: 'text',
    position: 42,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "do",
    answer: 'ど',
    displayAnswer: 'だ,で,た,ち,ど',
    type: 'text',
    position: 43,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "te",
    answer: 'て',
    displayAnswer: 'た,ち,つ,て,と',
    type: 'text',
    position: 44,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: "ba",
    answer: 'ば',
    displayAnswer: 'ば,び,ぶ,べ,ぼ',
    type: 'text',
    position: 45,
    imageUrl: '',
    youtubeVideoId : ''
  },
  {
    question: 'a-ri-ga-to-go-za-i-ma-su',
    questionNode: 'thank you very much',
    answer: 'ありがとうございます',
    displayAnswer: 'あ,と,う,ご,い,ま,ざ,が,す,り',
    type: 'text',
    position: 46,
    imageUrl: '',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q5-6thankyouverymuch.mp3'
  },
  {
    question: 'do-u-i-ta-shi-ma-shi-te',
    questionNode: 'you are welcome',
    answer: 'どういたしまして',
    displayAnswer: 'ど,い,し,ざ,じ,た,う,ぜ,ま,て',
    type: 'text',
    position: 47,
    imageUrl: '',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q5-7youarewelcome.mp3'
  },
  {
    question: 'o-ha-yo-u-go-za-i-ma-su',
    questionNode: 'good morning',
    answer: 'おはようございます',
    displayAnswer: 'お,ご,す,は,た,よ,う,ま,ざ,い',
    type: 'text',
    position: 48,
    imageUrl: '',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q5-8goodmorning.mp3'
  },
  {
    question: 'ko-n-ba-n-wa',
    questionNode: 'good evening',
    answer: 'こんばんは',
    displayAnswer: 'こ,ば,つ,は,た,で,ん,ち,て,と',
    type: 'text',
    position: 49,
    imageUrl: '',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q5-9goodevening.mp3'
  },
  {
    question: 'o-ya-su-mi-na-sa-i',
    questionNode: 'good night',
    answer: 'おやすみなさい',
    displayAnswer: 'お,ば,さ,や,す,み,べ,ぼ,な,い',
    type: 'text',
    position: 50,
    imageUrl: '',
    youtubeVideoId: '',
    videoUrl: '',
    audioUrl: 'app/assets/q5-10goodnight.mp3'
  }

];