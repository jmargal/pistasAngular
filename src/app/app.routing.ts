import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './pistas/list/list.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MainComponent } from './pistas/main/main.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantala-principal/pantalla-principal.component';


const routes: Routes = [
  {
    path:'',
    component: PantallaPrincipalComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'centers',
    component: MainComponent
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path: 'editUser',
    component:EditUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
