import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MeatsDto } from '../dtos/meats.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.api;

  constructor(private http: HttpClient) { }

  getAdmin() {
    return this.http.get(`${this.url}/admin`)
  }

  getAll(): Observable<MeatsDto[]> {
    return this.http
      .get<MeatsDto[]>(`${this.url}/meats/getAll`)
  }

  login() {
    return this.http.get(`${this.url}/login`)
  }

  newMeat(meat: MeatsDto) {
    return this.http.post(`${this.url}/meats/newMeat`, meat)
  }
}
