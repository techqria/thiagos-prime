import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  sidebar: boolean = false;

  scrolled: boolean = true;

  constructor(private router: Router) { }

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
    } else {
      this.sidebar = true;
    }
  }

  scrollTo(section: string) {
    if (this.router.url == '/') {
        document.getElementById(section)?.scrollIntoView()
    } else {
      this.router.navigate(['/'],
        {
          state: {
            section: section
          }
        });
    }
  }

}
