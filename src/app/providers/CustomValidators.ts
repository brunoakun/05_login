import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export default class CustomValidators {

  // Match de 2 valores
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  // Múltiplo de 5
  static multiplo5(control: AbstractControl): ValidationErrors | null {
    let nro = parseInt(control.value);
    if (nro % 5 == 0)
      return null;
    else
      return { multiplo5: true }
  }

  // Tiene 1 espacio
  static tieneEspacio(control: AbstractControl): ValidationErrors | null {
    let str = control.value.trim();
    if (str.includes(" "))
      return null;
    else
      return { tieneEspacio: true }
  }


  // eMail válido  
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    let email = control.value.trim();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return null;
    }
    return { invalido: true }
  }


  // Url  
  static urlValidator(control: AbstractControl) {
    if (control.value === '') {
      return null;
    }
    console.log(control.value);
    if (!control.value.startsWith('http') || !control.value.startsWith('http')) {
      console.log("urlValid:" + control.value);
      return { urlValid: true };
    }
    return null;
  }

  // Mayor de edad
  static ageValidator(control: AbstractControl) {
    if (control.value === '') {
      return null;
    }
    if (control.value < 18) {
      return { menorDeEdad: true };
    }
    return null;
  }



  // Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
  // Acepta NIEs (Extranjeros con X, Y o Z al principio)
  static validateDNI(control: AbstractControl) {
    var numero, letx, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
    var dni = control.value.toUpperCase();

    if (expresion_regular_dni.test(dni) === true) {
      numero = dni.substr(0, dni.length - 1);
      numero = numero.replace('X', 0);
      numero = numero.replace('Y', 1);
      numero = numero.replace('Z', 2);
      letx = dni.substr(dni.length - 1, 1);
      numero = numero % 23;
      letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero + 1);
      if (letra != letx) {
        //alert('Dni erroneo, la letra del NIF no se corresponde');
        return { letraDni: true };
      } else {
        //alert('Dni correcto');
        return null;
      }
    } else {
      //alert('Dni erroneo, formato no válido');
      return { formatoDni: true };
    }
  }


  /*
   * IBAN is valid 
   */
  static validateIBAN(control: AbstractControl) {
    let IBAN = control.value.toUpperCase();
    IBAN = IBAN.trim();
    IBAN = IBAN.replace(/\s/g, "");
    var letra1, letra2, num1, num2;
    var isbanaux;
    var numeroSustitucion;
    if (IBAN.length != 24) {
      // Longitud incorrecta
      return { longitud: true };
    }

    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letra1);
    num2 = getnumIBAN(letra2);
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);
    var resto = parseFloat(modulo97(isbanaux));
    if (resto == 1) {
      return null;
    } else {
      // Iban no válido
      return { formato: true };
    }

    function modulo97(iban: string) {
      var parts = Math.ceil(iban.length / 7);
      var remainer = "";
      for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer + iban.substr((i - 1) * 7, 7)) % 97);
      }
      return remainer;
    }

    function getnumIBAN(letra: any) {
      let ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return ls_letras.search(letra) + 10;
    }

  }



}