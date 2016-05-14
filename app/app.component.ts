/**
 * Created by deronlee on 5/14/16.
 */

import {Component} from '@angular/core';
import {PlayComponent} from './play.component';
import {AnswerComponent} from './answer.component';
import {Question} from './interfaces'
import {GameService} from "./services/game.service";
import {TimerService} from './services';

@Component({
    selector:'app',
    directives:[PlayComponent, AnswerComponent],
    providers:[GameService],
    template:`
    <play></play>
    `

})

export class AppComponent {
    private activeQuestion:Question;
    private question:Question;

    constructor(private gameService: GameService) {
    }

}
