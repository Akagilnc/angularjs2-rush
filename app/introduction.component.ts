import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'introduction',
  template: `
  <p>Welcome to our app</p>
  <a class='btn btn-primary' [routerLink]='["PlayComponent"]'>Start game</a>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class IntroductionComponent {

}