import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  validForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });

  }

  ngOnInit(): void { }

  login() {

    if (this.form.controls['username'].status === "INVALID" || this.form.controls['password'].status === "INVALID") {
      this.validForm = false
    } else {
      this.validForm = true

    }
  }

}
