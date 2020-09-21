import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  // en el metodo ngOnInit, hacemos uso del servicio usuario
  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(    //nos suscribimos ya que es un metodo observable
      usuarios => this.usuarios = usuarios          // con una funcion flecha asignamos los usuarios obtenimos en una arreglo de tipo Usuario
    );
  }

}
