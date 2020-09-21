import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';                   // Modulo para comunicarnos el el servidor Backend
import { Usuario } from '../models/Usuario';
import { catchError, map } from 'rxjs/operators';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string ="http://localhost:8080/api/usuarios";               // urlEndPoint del servidor de Spring

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})      // asigamos el tipo de contenido en las cabeceras


  constructor(private http : HttpClient, private router:Router) { }               // inyectamos el modulo HttpClient para hacer uso de peticiones http, y el modulo Router para redireccionar a otra ruta

   /* Método que obtiene todos los Usuarios */
   getUsuarios(): Observable<Usuario[]>{                  // definimos el método como Observable para que la peticion sea asincrono
    return this.http.get(this.urlEndPoint).pipe(          // con el método get hacemos la peticion al endpoint definido 
      map (response => response as Usuario[])             // mapeamos la respuesta (objeto json), lo convertimos a objeto de tipo Usuario
    )
  }

  /* Metodo para agregar registrar Usuario */
  createUsuario(usuario: Usuario) : Observable<any>{        // retorna un observable de tipo any (para poder acceser a las propiedades del objeto) 
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(  // con el metodo post, enviamos todos los datos del usuario, al endpoint del backend, junto con las cabeceras http 
      catchError(e => {                                     // definimos un posible error
        console.error("Error:" + e.error.mensaje);
        this.router.navigate(['/usuarios']);                // redireccionamos a la ruta de los usuarios
        Swal.fire(e.error.mensaje, e.error.erro, 'error');  // mostramos una alerta de confirmacion
        return throwError(e)
      })
    )
  }

   /* Obtener 1 usuario */
   getUsuario(correo): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${correo}`);
  }
}
