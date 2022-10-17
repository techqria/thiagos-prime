import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  validForm: false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
    })
  }

  ngOnInit(): void { }

  login() {
    this.authService.authenticate(this.form.value).subscribe(
      success => {
        if(success) {
          this.authService.setAuthenticatedUser()
          this.router.navigate(['/admin'])
        }
      },
      error => console.log(error)
    )
  }

}
