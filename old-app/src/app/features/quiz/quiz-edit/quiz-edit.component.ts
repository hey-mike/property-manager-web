import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuizService } from '../quiz.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {

  title: string;
  quiz: Quiz;
  form: FormGroup;
  // this will be TRUE when editing an existing quiz,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private fb: FormBuilder,
    private location: Location) {

    // create an empty object from the Quiz interface
    this.quiz = <Quiz>{};


  }
  ngOnInit() {
    // initialize the form
    this.createForm();

    const id = +this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.quizService.getQuiz(id).subscribe(quiz => {
        this.quiz = quiz;
        this.title = 'Edit - ' + this.quiz.Title;

        // update the form with the quiz value
        this.updateForm();
      });
    } else {
      this.editMode = false;
      this.title = 'Create a new Quiz';
    }
  }
  createForm() {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Description: '',
      Text: ''
    });
  }

  updateForm() {
    this.form.setValue({
      Title: this.quiz.Title,
      Description: this.quiz.Description || '',
      Text: this.quiz.Text || ''
    });
  }
  onSubmit() {
    // build a temporary quiz object from form values
    const tempQuiz = <Quiz>{};
    tempQuiz.Title = this.form.value.Title;
    tempQuiz.Description = this.form.value.Description;
    tempQuiz.Text = this.form.value.Text;

    if (this.editMode) {
      // don't forget to set the tempQuiz id,
      // otherwise the EDIT would fail!
      tempQuiz.id = this.quiz.id;

      this.quizService.updateQuiz(tempQuiz).subscribe(res => {
        console.log('Quiz ' + res + ' has been updated.');
        this.onBack();
      });

    } else {
      this.quizService.addQuiz(tempQuiz).subscribe(res => {
        console.log('Quiz ' + res + ' has been created.');
        this.onBack();
      });
    }
  }
  onBack(): void {
    this.router.navigate(['dashboard']);
  }
  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    const e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
}
