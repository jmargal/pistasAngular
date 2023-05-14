import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionsComponent } from './opinions/opinions.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NewOpinionComponent } from './new-opinion/new-opinion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditOpinionComponent } from './edit-opinion/edit-opinion.component';



@NgModule({
  declarations: [
    OpinionsComponent,
    NewOpinionComponent,
    EditOpinionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpinionsModule { }
