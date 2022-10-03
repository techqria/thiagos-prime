import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss']
})
export class CheckLoginComponent implements OnInit {
  
  logged: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
