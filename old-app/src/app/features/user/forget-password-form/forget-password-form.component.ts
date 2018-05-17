import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.css']
})
export class ForgetPasswordFormComponent implements OnInit {

  title: string;
  form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }


  ngOnInit() {
    this.title = 'User Login';

    // initialize the form
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {

    const email = this.form.value.email;

    // this.authService.forget(email)
    //   .subscribe(res => {
    //     // login successful

    //     // outputs the login info through a JS alert.
    //     // IMPORTANT: remove this when test is done.
    //     alert('Login successful! '
    //       + 'USERNAME: '
    //       + email
    //       + ' TOKEN: '
    //       + this.authService.getAuth().token
    //     );

    //     this.router.navigate(['dashboard']);
    //   },
    //     err => {
    //       // login failed
    //       console.log(err);
    //       this.form.setErrors({
    //         'auth': 'Incorrect username or password'
    //       });
    //     });
  }

  onBack() {
    this.router.navigate(['login']);
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
  getErrorMessage(name) {
    const errors = {};
    errors['email'] = (this.getFormControl('email').hasError('required') ? 'You must enter a value' :
      this.getFormControl('email').hasError('email') ? 'Not a valid email' : '');

    return errors[name];
  }
}
