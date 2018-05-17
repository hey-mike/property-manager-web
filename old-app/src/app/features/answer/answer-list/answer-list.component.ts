import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit, OnChanges {
  @Input() question: Question;
  answers: Answer[];
  title: string;

  constructor(private answerService: AnswerService, private router: Router) {
    this.answers = [];
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {

      // retrieve the question variable change info
      const change = changes['question'];

      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        this.loadData();
      }
    }
  }

  ngOnInit() {
  }

  loadData() {
    this.answerService.getAnswers(this.question.id).subscribe(answers => this.answers);
  }

  onCreate() {
    this.router.navigate(['/answer/create', this.question.id]);
  }

  onEdit(answer: Answer) {
    this.router.navigate(['/answer/edit', answer.id]);
  }

  onDelete(answer: Answer) {
    if (confirm('Do you really want to delete this answer?')) {
      this.answerService.deleteAnswer(answer).subscribe(res => {
        console.log('Answer ' + answer.id + ' has been deleted.');
        // refresh the question list
        this.loadData();
      });
    }
  }
}
