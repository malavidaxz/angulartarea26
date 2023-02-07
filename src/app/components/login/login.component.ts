import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisosService } from 'src/app/services/permisos.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin !: FormGroup;
  constructor( private usuarioService:PermisosService, private router:Router, private formBuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username:['',[
        Validators.required,
        Validators.minLength(4)
      ]] ,
      password:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]]
    })
  }

  onSubmit(){
    this.usuarioService.loginUsuario(this.formLogin.get('username')?.value,this.formLogin.get('password')?.value)
    .subscribe(
      (usuarios) => {
        if (usuarios.length > 0) {
          // Usuario autenticado correctamente, mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Autenticado',
            text: 'Ingreso Exitoso'
          })
          this.router.navigate(['/home']);
        } else {
          // Usuario o contraseña incorrectos, mostrar alerta de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos'
          })
        }
      }
    );
}
}

