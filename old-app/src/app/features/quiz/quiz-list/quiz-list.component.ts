import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  @Input() class: string;
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];

  constructor(private quizService: QuizService, private router: Router) {

  }

  ngOnInit() {
    console.log('QuizListComponent' +
      ' instantiated with the following class: '
      + this.class);
    this.getQuizes();
  }

  getQuizes(): void {
    switch (this.class) {
      case 'latest':
      default:
        this.title = 'Latest Quizzes';
        this.quizService.getQuizzesByDate().subscribe(quizzes => this.quizzes = quizzes);
        break;
      case 'byTitle':
        this.title = 'Quizzes by Title';
        this.quizService.getQuizzesByTitle().subscribe(quizzes => this.quizzes = quizzes);
        break;
      case 'random':
        this.title = 'Random Quizzes';
        this.quizService.getQuizzesByRandom().subscribe(quizzes => this.quizzes = quizzes);
        break;
    }
  }

  onSelect(quiz: Quiz) {
    // console.log(quiz);
    this.selectedQuiz = quiz;
    console.log('quiz with id '
      + this.selectedQuiz.id
      + ' has been selected.');
    this.router.navigate(['/quiz', this.selectedQuiz.id]);
  }
}
