import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentersComponent } from './centers/centers.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { NewCenterComponent } from './new-center/new-center.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCenterComponent } from './edit-center/edit-center.component';



@NgModule({
  declarations: [
    CentersComponent,
    NewCenterComponent,
    EditCenterComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    PaginatorModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[CentersComponent]

})
export class ManagementModule { }
