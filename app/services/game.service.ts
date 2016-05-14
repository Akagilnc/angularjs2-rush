import {Injectable} from '@angular/core';
import {Question} from '../interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GameService {

  constructor() {

  }

  getQuestions():Array<Question> {
    return data;
  }

  submitAnswer(question: Question, answer: string):boolean {
    throw new Error("not implemented");
  }

  onQuestionChanged(): Observable<Question> {

  }

  getCurrentQuestion():Question {

  }

  nextQuestion() {

  }

  previousQuestion() {

  }

  publishChangeQuestion() {

  }
}

var data:Array<Question> = [{
  question: 'Sample',
  answer: 'Sample',
  type: 'text'
}];