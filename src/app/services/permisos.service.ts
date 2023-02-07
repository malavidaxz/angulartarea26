
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, throwError} from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users' //Url de la Api
  usuariosList: any[] = []; //almacena el usuarios obtenido por el filtrado
  private _isLogin:boolean = false; //validara si el usuario inicio Sesión

  constructor(private http:HttpClient, private router:Router) { }

  //Método para obtener los Usuarios
  getUsuarios(){
    return this.http.get<Usuarios[]>(`${this.baseUrl}`)//esto nos devuelve la información de los usuarios
  }

  //filtrar usuario por username y por email
  loginUsuario(username:string , email:string){
    return this.http.get<any>(`${this.baseUrl}`)
      .pipe(
        map(usuarios => {
          this.usuariosList = usuarios.filter((usuario:any) => usuario.username === username && usuario.email === email);
          //solo si se encontró un usuario con esas credenciales se asigna true a la variable isLogin
          if(this.usuariosList.length > 0){
            this._isLogin = true;
            localStorage.setItem('usuario',JSON.stringify(this._isLogin)); //debemos convertir el objeto en un Json, y el key para poder acceder a esa info es usuario
          }
          return this.usuariosList;
        })
      );
  }

  //comprobamos si existe el usuario en el localStorage, si es true, el usuario tiene sesión activa
  isLogin(){
    if(localStorage.getItem('usuario')){
      return true //solo si la cuenta esta abierta devolverá true
    }
    return false 
  }

  //Cerrar Sesión
  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('usuario'); //eliminamos el localStorage
        this.router.navigate(['/login']); //redirigimos al login
      }
    });
  }
  
  //obtener el detalle del usuario por el parámetro de ruta
  detalleUsuario(id: number) {
    return this.http.get<Usuarios>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) { //si el id no existe, me devuelve el status 404
            Swal.fire({ //le mostramos una alerta al Usuario
              icon: 'error',
              title: 'Oops...',
              text: 'No se encontró el usuario con el ID especificado'
            });
            this.router.navigate(['/home']); //redireccionar al home
          }
          return throwError(() => error);//mostramos el error
        })
      );
  }
}

