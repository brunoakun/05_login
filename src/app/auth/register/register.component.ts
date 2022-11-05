import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import CustomVal from '../../providers/CustomValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  password2: string = '';

  fieldTextType: boolean = false;
  enviado: boolean = false;

  constructor(
    public route: Router,
    private fb: UntypedFormBuilder,
    private srvAuth: AuthService
  ) { }

  registerForm = this.fb.group({
    email: ['', [Validators.required, CustomVal.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    password2: ['', Validators.required]
  },
    {
      validators: [CustomVal.match('password', 'password2')]
    }
  );

  ngOnInit(): void {
    this.srvAuth.logOut();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.enviado = true;
    if (this.registerForm.invalid) {
      console.log("ERRORES:");
      console.log(this.registerForm.errors);
      return;
    }

    this.srvAuth.registro(this.registerForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        const data = resp.data;
        if (resp.error) {
          alert(`ERROR: ${resp.message.email}`);
          return;
        } else {
          alert(`CORRECTO: ${resp.message}`);
          this.route.navigateByUrl('/login');
          return
        }
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
