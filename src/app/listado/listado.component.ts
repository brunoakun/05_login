import { IUsuario } from './../models/usuario';
import { UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  usuarios: IUsuario[] | undefined;

  constructor(public srvUsr: UsuariosService) { }

  ngOnInit(): void {
    this.srvUsr.usrList().subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.error) {
          alert(`ERROR: ${resp.message}`);
          return;
        }
        this.usuarios = resp.data;
      },
      error: (err) => {
        console.error(err);
        alert('Error en la llamada a la API');
      }
    });
  }

}
