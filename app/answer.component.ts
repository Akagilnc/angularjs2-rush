/**
 * Created by deronlee on 5/14/16.
 */
import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {Question} from './interfaces';
import {GameService} from './services/game.service';
import {NgFor, NgClass} from '@angular/common';
@Component({
    selector: 'answer',
    directives: [NgFor, NgClass],
    template:`
  <div class='row answer-row'>
    <div class='col-md-3'>
      <div class='answer-title'>Answer:</div>
    </div>
    <div class='col-md-9'>
      <div class='answer-placeholder' [ngClass]="{check(answer): answer.length == activeQuestion.answer.length}">{{answer}}</div>
      <i class='fa fa-check fa-2x'></i>
    </div>
  </div>

  <div class='row keyboard-row' *ngIf="keyboards != null">
    <div class='col-md-12'>
      <div class="row keyboard">
        <div class="col-md-12 keyboard-line">
          <span *ngFor="let key of keyboards[0]" class="key" (click)="selectKey(key)">{{key}}</span>


        </div>
        <div class="col-md-12 keyboard-line">
          <span *ngFor="let key of keyboards[1]" class="key" (click)="selectKey(key)">{{key}}</span>
        </div>
      </div>
    </div>
  </div>
  `,
    styles: [`
  .answer-title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .answer-placeholder {
    width: 120px;
    display: inline-block;
    border-bottom: 2px solid black;
    height: 24px;
  }

  .answer-row {
    margin-bottom: 1em;
  }

  .keyboard {
    text-align: center;
  }

  .keyboard .key{
    border: 1px solid black;
    border-radius: 5px;
    margin-left: 5px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    width: 39px;
  }

  .keyboard .key:hover{
    background-color: gray;
  }

  .keyboard-line {
    margin-bottom: 10px;
  }

  .keyboard-row {
    margin-bottom: 2em;
  }
  `]
})
export class AnswerComponent implements OnChanges{
    @Input('question') question: Question;
    private answer: string = '';
    private keyboards: Array<Array<string>>;

    constructor(private gameService: GameService) {
        this.keyboards = null;
        this.question = null;
    }

    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        if (changes['question'] != null) {
            this._rearrangeKeyboard();
        }
    }

    clear() {

    }

    _rearrangeKeyboard(): void {
        var array:Array<string> = [];
        for (var i = 0; i < this.question.answer.length; i++) {
            var char = this.question.answer[i].toUpperCase();
            array.push(char);
        }
        for (var i = 65; i <= 90; i++) {
            var char = String.fromCharCode(i);
            if (array.indexOf(char) == -1) {
                array.push(char);
            }
        }
        array = array.splice(0, 12);
        this._shuffleArray(array);
        var array1 = array.splice(0, 6);
        array1.push('<')
        var array2 = array;
        this.keyboards = [
            array1,
            array2
        ]
        console.log(this.keyboards);
    }

    _shuffleArray(array:Array<any>){
        var count = array.length,
            randomnumber: number,
            temp: number;
        while (count) {
            randomnumber = Math.random() * count-- | 0;
            temp = array[count];
            array[count] = array[randomnumber];
            array[randomnumber] = temp
        }
    }

    selectKey(character: string) {
        if (character == '<') {
            if (this.answer.length > 0) {
                this.answer = this.answer.slice(0, this.answer.length -1);
            }
            return;
        }

        this.answer += character;
        if (this.answer == this.question.answer) {
            this.gameService.nextQuestion();
        }
    }



}