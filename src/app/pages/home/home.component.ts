import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users !: Usuarios[]; //declaramos un array utilizando nuestra interface Usuarios
  page: number = 1; //pagina actual
  constructor(private usuariosService:PermisosService, private router:Router) {
    this.getUsuarios(); //llamamos al método traer Usuarios
  }

  ngOnInit(): void {

  }
  //obtener todos los usuarios del servicio
  getUsuarios(){
    //utilizando nuestro método getUsuarios traemos todos los usuarios del Json y lo almacenamos en nuestro Array users
    this.usuariosService.getUsuarios().subscribe(
      (data: Usuarios[]) => {
        this.users = data;
      }
    );
  }

  //Redireccionar a la página Detalle y el id
  Detalle(id : number){
    this.router.navigate(['/detalle',id]);
  }

}
