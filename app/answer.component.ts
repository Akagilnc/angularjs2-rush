/**
 * Created by deronlee on 5/14/16.
 */
import {Component, ViewChild, Input, OnChanges, SimpleChange, EventEmitter, Output} from 'angular2/core';
import {Question} from './interfaces';
import {GameService, SoundService} from './services';
import {NgFor, NgClass} from 'angular2/common';
import {ModalComponent} from './modal.component';
import {AppSettings} from './app-settings';
//import {QuestionComponent} from './question.component';

@Component({
    selector: 'answer',
    directives: [NgFor, NgClass, ModalComponent],
    //providers: [QuestionComponent, SoundService],
    templateUrl: './app/answer.component.html',
    styles: []
})
export class AnswerComponent implements OnChanges {
    @ViewChild('characterList') characterList: ModalComponent;
    @Input('question') question: Question;
    @Input('answer') answer: string;
    @Output('onSubmitAnswer') onSubmitAnswerEvent: EventEmitter<string> = new EventEmitter<string>();

    private keyboards: Array<Array<string>>;
    private appTitle = AppSettings.TITLE;
    private modalSubmitButtonLabel = 'Next question';
    private characterListmodalSubmitLabel = 'OK';
    private modalClass = 'modal-lg';

    private answerHoles: Array<any>;
    private answerArray: Array<any>;
    private currentAnswerIndex = 0;
    constructor(private gameService: GameService) {
        this.keyboards = null;
        this.question = null;
    }

    showCharacterList() {
        this.characterList.open();
    }

    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        if (changes['question'] != null) {
            this.answer = '';
            this.answerHoles = [];
            this.currentAnswerIndex = 0;
            this._rearrangeKeyboard();
            for (var i = 0; i < this.question.answer.length; i++) {
                this.answerHoles.push('_');
            }
            //this.answerHoles.push('_');
        }
    }

    clear() {

    }

    _rearrangeKeyboard(): void {
        this.keyboards = [];
        var answerArray = this.question.displayAnswer.split(',');
        this._shuffleArray(answerArray);
        answerArray.push('<');
        this.keyboards.push(answerArray);
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
            if (this.currentAnswerIndex > 0) {
                this.answerHoles[this.currentAnswerIndex] = '';
                this.currentAnswerIndex--;
            }
            return;
        }

        this.answerHoles[this.currentAnswerIndex] = character;
        this.currentAnswerIndex++;

        this.answer = this.answerHoles.join('').trim();
        var answer = this.answer.replace("_", "");

        if (this.question.answer.length > 0 && answer.length >= this.question.answer.length)
        {
            this.submitAnswer();
        }
    }

    submitAnswer() {
        this.onSubmitAnswerEvent.emit(this.answer);
    }

}