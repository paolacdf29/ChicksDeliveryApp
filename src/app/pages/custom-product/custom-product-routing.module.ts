import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomProductPage } from './custom-product.page';

const routes: Routes = [
  {
    path: '',
    component: CustomProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomProductPageRoutingModule {}
