import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselDto } from 'src/app/dtos/carousel.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  form: FormGroup;
  validForm: boolean = true;

  http: string = "https://";

  image: File;

  carouselImages: CarouselDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
    ) { 
      this.form = this.formBuilder.group({
        image: ['', [Validators.required]],
        text: ['', [Validators.required, Validators.minLength(10)]],
        link: ['https://', [Validators.required, Validators.minLength(6)]],
      })
    }

  ngOnInit(): void {
  }

  imageChange(e: Event) {
    let target = e.target as HTMLInputElement;
    let files = target.files as FileList;

    this.image = files[0];
  }

  async newImageCarousel(){
    let imagePath = await this.apiService.uploadFile(this.image, 'carousel')

    this.form.value.image = imagePath;
    this.carouselImages = this.form.value;

    this.apiService.newImageCarousel(this.carouselImages).subscribe(
      success => {
        this.router.navigate(['/admin'])
      },
      error => console.log(error)
    )
  }

}
