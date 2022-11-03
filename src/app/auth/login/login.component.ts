import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

import CustomVal from '../../providers/CustomValidators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fieldTextType: boolean = false;
  enviado: boolean = false;

  constructor(
    public route: Router,
    private fb: UntypedFormBuilder,
    private srvAuth: UsersService
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
    if (this.loginForm.invalid) return;

    this.srvAuth.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(`resp ${resp}`);
        const data = resp.data;
        alert(data.token)
        if (data.token) this.srvAuth.setToken(data.token);
        //    this.route.navigateByUrl('/');
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
