import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'introduction',
  template: `
  <p>Japanese alphabet uses three sets of characters:</p>
  <ul>
    <li>Hiragana</li>
    <li>Katakana</li>
    <li>Kanji</li>
  </ul>
  <p>Today we will test your knowledge of Hiragana.</p>

  <p>We have 50 questions for you.</p>

  <p>You get 10 points for each of the correct answers.</p>

  <p>We have images and videos to help you learn.</p>

  <p>Gonna be awesome.</p>

  <a class='btn btn-primary' [routerLink]='["PlayComponent"]'>Let's get started!</a>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class IntroductionComponent {

}