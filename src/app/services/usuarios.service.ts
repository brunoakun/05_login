import { IUsuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from '../auth/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  env_apiURL: string = environment.apiURL;
  constructor(
    public http: HttpClient,
    public srvUsr: UsersService
  ) { }

  usrList() {
    const token: string = this.srvUsr.getToken();
    const header: any = { "Authorization": 'Bearer ' + token };
    return this.http.get<any>(`${this.env_apiURL}/usrList`, { headers: new HttpHeaders(header) });
  }

}
