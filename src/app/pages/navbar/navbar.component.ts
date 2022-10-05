import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  sidebar: boolean = false;

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

  showSidebar() {
    if (this.sidebar) {
      this.sidebar = false;
      document.getElementById('sidebar')?.blur()
    } else {
      this.sidebar = true;
    }
  }
}
