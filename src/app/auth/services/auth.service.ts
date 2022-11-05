import { JwtDecodeService } from './jwt-decode.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Propiedades
  apiURL: string = environment.apiURL;
  jwtData: any = {};

  constructor(
    private http: HttpClient,
    private srvJwt: JwtDecodeService
  ) { }

  login(form: any) {
    console.log(form)
    sessionStorage.removeItem("token");
    return this.http.post<any>(`${this.apiURL}/login`, form);
  }

  logOut() {
    sessionStorage.removeItem("token");
    this.jwtData = {};
  }

  registro(form: any) {
    sessionStorage.removeItem("token");
    return this.http.post<any>(`${this.apiURL}/register`, form);
  }

  setToken(token: string) {
    sessionStorage.setItem("token", token);
    this.jwtData = this.srvJwt.DecodeToken(token);
  }
  getToken() {
    let token = sessionStorage.getItem("token");
    if (token) return token;
    return ('');
  }
}
