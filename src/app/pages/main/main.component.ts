import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  location = {
    city: 'vicente',
    adress: 'Quadra 1 Conjunto 7 Lote 25 Setor Leste',
    phone: '(61) 3465-4745',
  };

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
  }

  changeLocation(city: string) {
    if (city === 'vicente') {
      this.location.adress = 'Quadra 1 Conjunto 7 Lote 25 Setor Leste';
      this.location.phone = '(61) 3465-4745';
      this.location.city = 'vicente';
    } else {
      this.location.adress = 'QNM 42 Conjunto A2 Lote 62';
      this.location.phone = '(61) 3491-0867';
      this.location.city = 'taguatinga';
    }
  }
}
