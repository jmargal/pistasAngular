import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './pistas/list/list.component';
import { MainComponent } from './pistas/main/main.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantala-principal/pantalla-principal.component';
import { ItemComponent } from './pistas/item/item.component';
import { RegisterComponent } from './register/register/register.component';


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
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'editUser',
    component:EditUserComponent
  },

  {
    path: '',
    loadChildren: () => import('../app/pistas/pistas.routing').then(m => m.PistasRoutingModule)
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
