/**
 * Created by deronlee on 5/14/16.
 */
import {Component, Input, OnChanges, SimpleChange, EventEmitter, Output} from '@angular/core';
import {Question} from './interfaces';
import {GameService, SoundService} from './services';
import {NgFor, NgClass} from '@angular/common';
//import {QuestionComponent} from './question.component';

@Component({
    selector: 'answer',
    directives: [NgFor, NgClass],
    //providers: [QuestionComponent, SoundService],
    templateUrl: './app/answer.component.html',
    styles: []
})
export class AnswerComponent implements OnChanges{
    @Input('question') question: Question;
    @Input('answer') answer: string;
    @Output('onSubmitAnswer') onSubmitAnswerEvent: EventEmitter<string> = new EventEmitter<string>();

    private keyboards: Array<Array<string>>;

    constructor(private gameService: GameService) {
        this.keyboards = null;
        this.question = null;
    }

    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        if (changes['question'] != null) {
            this.answer = '';
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

        if (this.question.answer && this.question.answer.length > 0 && this.answer.length == this.question.answer.length)
        {
            this.submitAnswer();
        }
    }

    submitAnswer() {
        this.onSubmitAnswerEvent.emit(this.answer);
    }

}