import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TableModule } from 'primeng/table';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    SidebarComponent,
    MainComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FullCalendarModule,
    TableModule,
    ReactiveFormsModule
  ],
  exports:[
    ListComponent,
    ItemComponent,
    SidebarComponent,
    MainComponent,
    SearchComponent
  ]
})
export class PistasModule { }
