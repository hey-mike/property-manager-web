import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-search',
  templateUrl: './quiz-search.component.html',
  styleUrls: ['./quiz-search.component.css']
})
export class QuizSearchComponent implements OnInit {
  @Input() class: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
