import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: string = this.srvAuth.getToken();
  titulo: string = environment.titulo;
  constructor(
    private router: Router,
    public srvAuth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.srvAuth.logOut();
    this.router.navigate(['/login']);
  }


}
