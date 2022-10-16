import { Target } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeatsDto } from 'src/app/dtos/meats.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {

  form: FormGroup;

  products: MeatsDto[];

  currentProductId: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {

    this.form = this.formBuilder.group({
      product: ['', [Validators.required, Validators.minLength(4)]],
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

  removeProduct() {
    this.apiService.removeMeat(this.currentProductId).subscribe(
      success => {
        console.log(success)
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
  }
}
