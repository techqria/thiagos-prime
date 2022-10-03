import { Component, OnInit } from '@angular/core';
import { MeatsDto } from 'src/app/dtos/meats.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  meats: MeatsDto[];

  kits: MeatsDto[] = [];
  diadia: MeatsDto[] = [];
  premiums: MeatsDto[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadMeats()
  }

  scrollTo(element: string) {
    document.getElementById(element)?.scrollIntoView();
  }

  loadMeats() {
    this.apiService.getAll().subscribe(
      response => {
        this.separateMeats(response)
      },
      error => {
        console.log(error)
      }
    )
  }

  separateMeats(meats: MeatsDto[]) {
    meats.forEach(meat => {
      if (meat.category == 'dia-dia') {
        this.diadia.push(meat)
      } else if (meat.category == 'kits') {
        this.kits.push(meat)
      } else {
        this.premiums.push(meat)
      }
    })
    console.log(this.kits)
  }
}
