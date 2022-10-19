import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselDto } from 'src/app/dtos/carousel.dto';
import { ApiService } from 'src/app/services/api.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NgbCarouselConfig]
})
export class MainComponent implements OnInit {

  location = {
    city: 'vicente',
    adress: 'Rua 04 A, Loja 01, Chácara 01, A Lote 06 - Vicente Pires DF',
    phone: '(61) 99982-2472',
  };
  showNavigationArrows = false;
	showNavigationIndicators = false;
  carouselImages: CarouselDto[];

  constructor(
    private route: Router,
    private apiService: ApiService,
    config: NgbCarouselConfig
  ) {
    if (this.route.getCurrentNavigation()?.extras.state) {
      this.scrollTo(this.route.getCurrentNavigation()?.extras.state)
    }
    config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.apiService.getAllImages().subscribe(
      success => {
        this.carouselImages = success
      },
      error => {
        console.log(error)
      }
    )
  }

  changeLocation(city: string) {
    if (city === 'vicente') {
      this.location.adress = 'Rua 04 A, Loja 01, Chácara 01, A Lote 06 - Vicente Pires DF';
      this.location.phone = '(61) 99982-2472';
      this.location.city = 'vicente';
    } else {
      this.location.adress = 'Qnm 42 Conjunto A2 - Tag. Norte';
      this.location.phone = '(61) 3491-0867';
      this.location.city = 'taguatinga';
    }
  }

  scrollTo(section: any) {
    setTimeout(() => {
      document.getElementById(section.section)?.scrollIntoView();
    }, 100)
  }
}
