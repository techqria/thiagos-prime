import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  scrolled: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.checkScroll()

    window.addEventListener('scroll', () => {
      this.checkScroll()
    })
  }

  checkScroll() {
    if (screen.availWidth > 992) {
      window.scrollY > 0 ? this.scrolled = true : this.scrolled = false
    }
  }
}
