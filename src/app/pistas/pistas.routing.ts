import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'centers', component: MainComponent }],
  },
  { path: 'court/:id', component: ItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PistasRoutingModule {}
