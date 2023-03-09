import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentersComponent } from './centers/centers.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    CentersComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    PaginatorModule
  ],
  exports:[CentersComponent]

})
export class ManagementModule { }
