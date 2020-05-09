import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasspagePage } from './passpage.page';

const routes: Routes = [
  {
    path: '',
    component: PasspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasspagePageRoutingModule {}
