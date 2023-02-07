import { Component, OnInit } from '@angular/core';
import { PermisosService } from 'src/app/services/permisos.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showMenu : boolean = true;
  constructor(private usuariosService:PermisosService) { }

  ngOnInit(): void {
  }

  toggle(){
    this.showMenu = !this.showMenu;
  }

  //cerrar sesión
  Logout(){
    this.usuariosService.logout(); 
  }

}
