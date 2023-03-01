import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    SidebarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FullCalendarModule
  ],
  exports:[
    ListComponent,
    ItemComponent,
    SidebarComponent,
    MainComponent
  ]
})
export class PistasModule { }
