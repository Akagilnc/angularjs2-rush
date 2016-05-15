import {Component} from 'angular2/core';
import {GameService} from './services';
@Component({
  selector: 'thankyou',
  template: `
  <h1>Your score: {{score}}</h1>

  <p>You have finished the last question. We glad that our app could bring you so far.</p>

  <p>Here are some resources for learning Hiragana:</p>

  <a href="https://en.wikipedia.org/wiki/Hiragana">https://en.wikipedia.org/wiki/Hiragana</a>
  <br/>
  <a href="http://www.omniglot.com/writing/japanese_hiragana.htm">http://www.omniglot.com/writing/japanese_hiragana.htm</a>
  `
})
export class ThankyouComponent {
  private score: number = 0;

  constructor(private gameService: GameService) {
    this.score = this.gameService.getScore();
  }
}