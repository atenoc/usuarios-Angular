import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  private usuario: Usuario = new Usuario()      // creamos un objeto de tipo usuario, importando del modelo

  constructor(private usuarioService: UsuarioService, private router:Router) {    // inyectamos el servicio del usuario y del enrutador

   }

  ngOnInit() {
  }

  // metodo para hacer uso del servicio 
  public create(): void{
    this.usuarioService.createUsuario(this.usuario) //pasando como argumento, todos los datos del usuario
    .subscribe(json => {                            // nos suscribimos, ya que es un método observable
      this.router.navigate(['/usuarios'])           // redireccionamos a la pantalla de usuarios
      Swal.fire('Información',`El usuario ${json.usuario.nombre} fue creado con éxito`,'success') // mandamos una alerta de confirmacion
      }
    );
  }

}
