import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import CustomVal from '../../providers/CustomValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fieldTextType: boolean = false;
  enviado: boolean = false;
  procesando: boolean = false;

  constructor(
    public route: Router,
    private fb: UntypedFormBuilder,
    private srvAuth: AuthService
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, CustomVal.emailValidator]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.enviado = true;
    this.procesando = true;
    if (this.loginForm.invalid) {
      this.procesando = false;
      return;
    }

    this.srvAuth.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(`resp ${resp}`);
        const data = resp.data;
        if (data.error) {
          this.srvAuth.logOut();
          alert(data.message);
          this.procesando = false;
          return;
        }
        this.srvAuth.setToken(data.token);
        alert(`token.name: ${this.srvAuth.jwtData.data.email}`);
        this.route.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
        //alert(JSON.stringify(err));
        alert(`ERROR En la llamada a la API: ${err.message}`);
        this.procesando = false;
      },
      complete: () => {
        console.info('complete');
        console.info(this.srvAuth.jwtData);
        this.procesando = false;
      }
    });
  }

}
