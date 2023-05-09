import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../guards/auth.guard';
import { OpinionsComponent } from '../opinions/opinions/opinions.component';
import { NewOpinionComponent } from '../opinions/new-opinion/new-opinion.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'centers', component: MainComponent }],
  },
  { path: 'court/:id',canActivate:[AuthGuard], component: ItemComponent },
  {
    path: 'court/:id/opinions',canActivate:[AuthGuard],component:OpinionsComponent
  },
  {
    path: 'court/:id/addOpinion',canActivate:[AuthGuard],component:NewOpinionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PistasRoutingModule {}
