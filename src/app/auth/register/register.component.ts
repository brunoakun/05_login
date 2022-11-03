import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import CustomVal from '../../providers/CustomValidators';

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
    private fb: UntypedFormBuilder,
    private srvAuth: UsersService
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

    this.srvAuth.registro(this.registerForm.value).subscribe(response => {
      console.log(response);
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
