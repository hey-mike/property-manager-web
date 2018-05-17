import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './quiz.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public quiz: Quiz;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private quizService: QuizService) {

    // create an empty object from the Quiz interface
    this.quiz = <Quiz>{};

    const id = +this.activatedRoute.snapshot.params['id'];
    if (id) {
      quizService.getQuiz(id).subscribe(quiz => this.quiz = quiz);
    } else {
      console.log('Invalid id: routing back to dashboard...');
      this.router.navigate(['dashboard']);
    }
  }
  ngOnInit() {

  }
  onEdit() {
    this.router.navigate(['quiz/edit', this.quiz.id]);
  }
  onDelete() {
    if (confirm('Do you really want to delete this quiz?')) {
      this.quizService.deleteQuiz(this.quiz).subscribe(res => {
        console.log('Quiz ' + this.quiz.id + ' has been deleted.');
        this.router.navigate(['dashboard']);
      });
    }
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
