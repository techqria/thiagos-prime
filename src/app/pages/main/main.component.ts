import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  location = {
    city: 'vicente',
    adress: 'Rua 04 A, Loja 01, Chácara 01, A Lote 06 - Vicente Pires DF',
    phone: '(61) 99982-2472',
  };

  constructor(private route: Router) {
    if (this.route.getCurrentNavigation()?.extras.state) {
      this.scrollTo(this.route.getCurrentNavigation()?.extras.state)
    }
  }

  ngOnInit(): void {
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
