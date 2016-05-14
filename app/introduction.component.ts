import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'introduction',
  template: `
  <p>Welcome to our app</p>
  <a class='btn btn-primary' [routerLink]='/play'>Start game</a>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class IntroductionComponent {

}