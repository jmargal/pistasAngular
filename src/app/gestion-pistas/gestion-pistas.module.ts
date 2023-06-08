import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { NewCourtComponent } from './new-court/new-court.component';
import { EditCourtComponent } from './edit-court/edit-court.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoComponent,
    NewCourtComponent,
    EditCourtComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    PaginatorModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ListadoComponent,
    NewCourtComponent,
    EditCourtComponent
  ]
})
export class GestionPistasModule { }
