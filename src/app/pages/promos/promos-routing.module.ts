import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromosPage } from './promos.page';

const routes: Routes = [
  {
    path: '',
    component: PromosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromosPageRoutingModule {}
