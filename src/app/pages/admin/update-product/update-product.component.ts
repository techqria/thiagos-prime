import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeatsDto } from 'src/app/dtos/meats.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  form: FormGroup;

  products: MeatsDto[];

  currentProductId: string;
  currentProduct: MeatsDto;
  productUpdated: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {

    this.form = this.formBuilder.group({
      price: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.apiService.getAll().subscribe(
      success => {
        this.products = success
      },
      error => console.log(error)
    )
  }

  checkForm() {
    this.productUpdated = this.currentProduct


    Object.keys(this.form.value).forEach(el => {
      if (this.form.value[el] != '') {
        this.productUpdated[el] = this.form.value[el]
      }
    })
  }

  updateProduct() {

    this.checkForm()


    this.apiService.updateMeat(this.currentProductId, this.productUpdated).subscribe(
      success => {
        this.router.navigate(['/admin'])
      },
      error => {
        console.log(error)
        this.router.navigate(['/admin'])
      }
    )
  }

  setCurrentProduct(e: any) {
    this.currentProductId = e.target.value;
    this.apiService.getMeatById(this.currentProductId).subscribe(
      success => {
        this.currentProduct = success
      },
      error => {
        console.log(error)
      }
    )
  }
}
