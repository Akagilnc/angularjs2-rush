/**
 * Created by deronlee on 5/14/16.
 */

import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
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
    <nav>
      <a [routerLink]="['/introduction']">Introduction</a>
    </nav>
    <router-outlet></router-outlet>
    <play></play>
    `

})

@Routes([
    {path: '/introduction', component: IntroductionComponent},
    {path: '/play', component: PlayComponent}
])

export class AppComponent implements OnInit{
    private activeQuestion:Question;
    private question:Question;

    constructor(private gameService: GameService, private router: Router) {
    }

    ngOnInit() {
        this.router.navigate(['introduction']);
    }

}
