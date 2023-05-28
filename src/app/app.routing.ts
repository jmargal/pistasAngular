import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './pistas/list/list.component';
import { MainComponent } from './pistas/main/main.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantala-principal/pantalla-principal.component';
import { ItemComponent } from './pistas/item/item.component';
import { RegisterComponent } from './register/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CentersComponent } from './management/centers/centers.component';
import { RolGuard } from './guards/rol.guard';
import { NewCenterComponent } from './management/new-center/new-center.component';
import { EditCenterComponent } from './management/edit-center/edit-center.component';
import { ListadoComponent } from './gestion-pistas/listado/listado.component';
import { NewCourtComponent } from './gestion-pistas/new-court/new-court.component';
import { EditCourtComponent } from './gestion-pistas/edit-court/edit-court.component';
import { MyBooksComponent } from './books/my-books/my-books.component';


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
    canActivate:[AuthGuard],
    component:EditUserComponent
  },
  {
    path:'manage/centers',
    canActivate:[RolGuard],
    component:CentersComponent
  },
  {
    path:'manage/newCenter',
    canActivate:[RolGuard],
    component:NewCenterComponent
  },
  {
    path:'manage/editCenter/:id',
    canActivate:[RolGuard],
    component:EditCenterComponent
  },
  {
    path:'manage/courts',
    canActivate:[RolGuard],
    component:ListadoComponent
  },
  {
    path:'manage/newCourt',
    canActivate:[RolGuard],
    component:NewCourtComponent
  },
  {
    path:'manage/editCourt/:id',
    canActivate:[RolGuard],
    component:EditCourtComponent
  },
  {
    path:'books/list',
    canActivate:[AuthGuard],
    component:MyBooksComponent
  },
  {
    path: '',
    loadChildren: () => import('../app/pistas/pistas.routing').then(m => m.PistasRoutingModule)
  },
  {
    path:'**',
    component: PantallaPrincipalComponent,

  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
