import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public year = new Date().getFullYear();
  id!:number; //almacenara el id recibido por la url
  public usuarioDetalle!:Usuarios; //almacenara el detalle recibido por el servicio
  constructor(private route:ActivatedRoute, private usuarioService:PermisosService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); //Obtenemos el ID de la url
    this.usuarioService.detalleUsuario(this.id) //le pasamos el id al método del servicio
      .subscribe(data => {
        this.usuarioDetalle = data; //almacenamos el valor recibido del observable en usuarioDetalle
        //console.log(this.usuarioDetalle)
      });
  }

}
