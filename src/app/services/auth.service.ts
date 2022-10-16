import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = environment.api;

  constructor(private http: HttpClient) { }

  getAuthenticatedUser(): any {
    return localStorage.getItem('user');
  }

  authenticate(user: UserDto) {
    console.log(user)
    return this.http.post(`${this.url}/auth/signin`, user);
  }
}
