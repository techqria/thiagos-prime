import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeatsDto } from 'src/app/dtos/meats.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss']
})
export class RegisterProductComponent implements OnInit {

  form: FormGroup;

  validForm: boolean = true;

  meat: MeatsDto;

  image: File;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      quantity: ['kg', [Validators.required]],
      category: ['kits', [Validators.required]],
      image: ['', [Validators.required]],
    })

  }

  ngOnInit(): void { }

  async registerProduct() {

    this.validForm = true;

    Object.keys(this.form.value).forEach(item => {
      if (this.form.value[item] == '') {
        this.validForm = false;
      }
    })

    if (this.validForm) {

      let imagePath = await this.apiService.uploadFile(this.image, this.form.value.category)

      this.form.value.image = imagePath;
      this.meat = this.form.value;

      this.apiService.newMeat(this.meat).subscribe(
        success => {
          this.router.navigate(['/admin'])
        },
        error => console.log(error)
      )

    }
  }

  imageChange(e: Event) {
    let target = e.target as HTMLInputElement;
    let files = target.files as FileList;

    this.image = files[0];
  }

}
