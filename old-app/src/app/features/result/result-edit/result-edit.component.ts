import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.css']
})
export class ResultEditComponent implements OnInit {
  title: string;
  result: Result;
  form: FormGroup;

  // this will be TRUE when editing an existing result,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private resultService: ResultService,
    private fb: FormBuilder,
    private router: Router) {

    // create an empty object from the Quiz interface
    this.result = <Result>{};
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
      this.resultService.getResult(id).subscribe(result => this.result = result);
    } else {
      this.result.QuizId = id;
      this.title = 'Create a new Result';
    }
  }
  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      MinValue: ['', Validators.pattern(/^\d*$/)],
      MaxValue: ['', Validators.pattern(/^\d*$/)]
    });
  }

  updateForm() {
    this.form.setValue({
      Text: this.result.Text,
      MinValue: this.result.MinValue || '',
      MaxValue: this.result.MaxValue || ''
    });
  }
  onSubmit() {
    // build a temporary result object from form values
    const tempResult = <Result>{};
    tempResult.Text = this.form.value.Text;
    tempResult.MinValue = this.form.value.MinValue;
    tempResult.MaxValue = this.form.value.MaxValue;
    tempResult.QuizId = this.result.QuizId;

    if (this.editMode) {
      this.resultService.updateResult(tempResult).subscribe(res => {
        console.log('Result ' + res.id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    } else {
      this.resultService.addResult(tempResult).subscribe(res => {
        console.log('Result ' + res.id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    }
  }

  onBack() {
    this.router.navigate(['quiz/edit', this.result.QuizId]);
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
