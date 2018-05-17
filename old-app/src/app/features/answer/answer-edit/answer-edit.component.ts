import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../answer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {
  title: string;
  answer: Answer;
  form: FormGroup;

  // this will be TRUE when editing an existing question,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private answerService: AnswerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location) {
    // create an empty object from the Quiz interface
    this.answer = <Answer>{};
  }

  ngOnInit() {
    // initialize the form
    this.createForm();

    this.loadData();
  }

  loadData() {
    const id = +this.activatedRoute.snapshot.params['id'];

    // quick & dirty way to check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

    if (this.editMode) {
      this.answerService.getAnswer(id).subscribe(answer => {
        this.answer = answer;
        this.title = 'Edit - ' + this.answer.Text;

        // update the form with the question value
        this.updateForm();
      });
    } else {
      this.answer.QuestionId = id;
      this.title = 'Create a new Answer';
    }
  }
  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      Value: ['',
        [Validators.required,
        Validators.min(-4),
        Validators.max(5)]
      ]
    });
  }

  updateForm() {
    this.form.setValue({
      Text: this.answer.Text || '',
      Value: this.answer.Value || 0
    });
  }
  onSubmit() {
    // build a temporary answer object from form values
    const tempAnswer = <Answer>{};
    tempAnswer.Text = this.form.value.Text;
    tempAnswer.Value = this.form.value.Value;
    tempAnswer.QuestionId = this.answer.QuestionId;

    if (this.editMode) {
      // don't forget to set the tempAnswer id,
      // otherwise the EDIT would fail!
      tempAnswer.id = this.answer.id;
      this.answerService.updateAnswer(tempAnswer).subscribe(res => {
        console.log('Answer ' + res.id + ' has been updated.');
        this.router.navigate(['question/edit', res.QuestionId]);
      });
    } else {
      this.answerService.addAnswer(tempAnswer).subscribe(res => {
        console.log('Answer ' + res.id + ' has been created.');
        this.router.navigate(['question/edit', res.QuestionId]);
      });
    }
  }

  // onBack() {
  //   this.router.navigate(['question/edit', this.answer.QuestionId]);
  // }
  onBack(): void {
    this.location.back();
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
