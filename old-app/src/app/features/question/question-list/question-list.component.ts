import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnChanges {
  @Input() quiz: Quiz;
  questions: Question[];
  title: string;

  constructor(private questionService: QuestionService, private router: Router) {
    this.questions = [];
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['quiz']) {

      // retrieve the quiz variable change info
      const change = changes['quiz'];

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
    this.questionService.getQuestions(this.quiz.id).subscribe(questions => this.questions = questions);
  }

  onCreate() {
    this.router.navigate(['/question/create', this.quiz.id]);
  }

  onEdit(question: Question) {
    this.router.navigate(['/question/edit', question.id]);
  }

  onDelete(question: Question) {
    if (confirm('Do you really want to delete this question?')) {
      this.questionService.deleteQuestion(question.id).subscribe(res => {
        console.log('Question ' + question.id + ' has been deleted.');

        // refresh the question list
        this.loadData();
      });
    }
  }

}
