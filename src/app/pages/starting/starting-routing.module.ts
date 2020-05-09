import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartingPage } from './starting.page';

const routes: Routes = [
  {
    path: '',
    component: StartingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartingPageRoutingModule {}
