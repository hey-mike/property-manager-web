import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  title: string;
  question: Question;
  form: FormGroup;
  activityLog: string;

  // this will be TRUE when editing an existing question,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router) {

    // create an empty object from the Quiz interface
    this.question = <Question>{};
  }
  ngOnInit() {
    // initialize the form
    this.createForm();

    this.loadData();
  }
  loadData() {
    const id = +this.activatedRoute.snapshot.params['id'];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

    if (this.editMode) {
      this.questionService.getQuestion(id).subscribe(question => {
        this.question = question;
        this.title = 'Edit - ' + this.question.Text;
      });
    } else {
      this.question.QuizId = id;
      this.title = 'Create a new Question';
    }
  }
  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required]
    });

    this.activityLog = '';
    this.log('Form has been initialized.');

    // react to form changes
    this.form.valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          this.log('Form Model has been loaded.');
        } else {
          this.log('Form was updated by the user.');
        }
      });

    // react to changes in the form.Text control
    this.form.get('Text').valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          this.log('Text control has been loaded with initial values.');
        } else {
          this.log('Text control was updated by the user.');
        }
      });
  }


  log(str: string) {
    this.activityLog += '['
      + new Date().toLocaleString()
      + '] ' + str + '<br />';
  }

  updateForm() {
    this.form.setValue({
      Text: this.question.Text || ''
    });
  }
  onSubmit() {
    // build a temporary question object from form values
    const tempQuestion = <Question>{};
    tempQuestion.Text = this.form.value.Text;
    tempQuestion.QuizId = this.question.QuizId;

    if (this.editMode) {
      this.questionService.updateQuestion(tempQuestion).subscribe(res => {
        console.log('Question ' + res + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    } else {
      this.questionService.addQuestion(tempQuestion).subscribe(res => {
        console.log('Question ' + res.id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    }
  }

  onBack() {
    this.router.navigate(['quiz/edit', this.question.QuizId]);
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
