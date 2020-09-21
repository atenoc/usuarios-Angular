import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario()

  constructor(private usuarioService: UsuarioService, private router:Router) { }

  ngOnInit() {
  }

  public buscarCorreo(correo): void{
    this.usuarioService.getUsuario(correo)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      swal.fire('Información',`Cliente ${usuario.nombre} ha iniciado sesion`,'success')
      }
    );
  }

}
