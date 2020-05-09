import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomProductPageRoutingModule } from './custom-product-routing.module';

import { CustomProductPage } from './custom-product.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomProductPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CustomProductPage]
})
export class CustomProductPageModule {}
