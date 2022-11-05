import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  env_apiURL: string = environment.apiURL;
  constructor(
    public http: HttpClient,
    public srvAuth: AuthService
  ) { }

  usrList() {
    const token: string = this.srvAuth.getToken();
    console.info(token);
    const header: any = { "Authorization": 'Bearer ' + token };
    return this.http.get<any>(`${this.env_apiURL}/usrList`, { headers: new HttpHeaders(header) });
  }

}
