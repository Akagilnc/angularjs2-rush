/**
 * Created by deronlee on 5/14/16.
 */

import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {PlayComponent} from './play.component';
import {AnswerComponent} from './answer.component';
import {Question} from './interfaces'
import {GameService, TimerService, SoundService, HighscoreService} from "./services";
import {IntroductionComponent} from "./introduction.component";


@Component({
    selector:'app',
    directives:[PlayComponent, AnswerComponent, ROUTER_DIRECTIVES],
    providers:[GameService],
    template:`
    <div class="container app-container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 header">
                <div class="row">
                    <div class="col-md-8">
                        <div class="logo">Hi ひらがな</div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 col-md-offset-2">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>

    `

})

@RouteConfig([
    {path: '/', name: 'IntroductionComponent', component: IntroductionComponent},
    {path: '/play', name: 'PlayComponent', component: PlayComponent}
])
export class AppComponent implements OnInit{
    private activeQuestion:Question;
    private question:Question;
    private imgUrl = "https://pixabay.com/static/uploads/photo/2013/07/12/19/20/shinto-154572_960_720.png";

    constructor(private gameService: GameService, private router: Router) {

    }

    ngOnInit() {

    }

}
