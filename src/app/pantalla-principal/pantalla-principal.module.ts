import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaPrincipalComponent } from './pantala-principal/pantalla-principal.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app.routing';



@NgModule({
  declarations: [
    PantallaPrincipalComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule
  ]
})
export class PantallaPrincipalModule { }
