import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselDto } from 'src/app/dtos/carousel.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-remove-image',
  templateUrl: './remove-image.component.html',
  styleUrls: ['./remove-image.component.scss']
})
export class RemoveImageComponent implements OnInit {

  form: FormGroup;

  imagesCarousel: CarouselDto[];

  currentCarouselId: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {

    this.form = this.formBuilder.group({
      carouselImage: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {
    this.apiService.getAllImages().subscribe(
      success => {
        this.imagesCarousel = success
      },
      error => console.log(error)
    )
  }

  removeImage() {
    this.apiService.removeImage(this.currentCarouselId).subscribe(
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
    this.currentCarouselId = e.target.value;
  }
}
