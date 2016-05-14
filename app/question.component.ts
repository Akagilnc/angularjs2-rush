import {Component, Input, OnInit} from '@angular/core';
import {Question} from './interfaces';
import {GameService} from './services';

@Component({
  selector: 'question-cmp',
  template: ''
})
export class QuestionComponent implements OnInit {
  @Input() question:Question;

  ngOnInit() {

  }
}