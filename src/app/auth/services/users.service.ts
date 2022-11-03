import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  login(form: any) {
    console.log(form)
    return this.http.post<any>(`${this.apiURL}/login`, form);
   }

  registro(form: any) {
    return this.http.post<any>(`${this.apiURL}/register`, form);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}
