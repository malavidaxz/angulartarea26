import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutorizarGuard } from './Guard/autorizar.guard';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent, canActivate:[AutorizarGuard]}, //redireccionar al Home
  {path:'login',component:LoginComponent}, //redireccionar al Login
  {path:'detalle/:id', component:DetalleComponent,canActivate:[AutorizarGuard]}, //Redirigir al Detalle
  { path: '**', pathMatch:'full', redirectTo: 'login' }// cualquier url redirigir a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
