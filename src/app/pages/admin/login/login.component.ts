import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  validForm: true;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
    })
  }

  ngOnInit(): void { }

  login() {
    this.authService.authenticate(this.form.value)
  }

}
