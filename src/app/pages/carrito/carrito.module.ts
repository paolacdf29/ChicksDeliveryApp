import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { ComponentsModule } from '../../components/components.module';
//import { PopDetailsComponent } from '../../components/pop-details/pop-details.component';
//import { DetailsPage } from '../details/details.page';

@NgModule({
  entryComponents: [
    //PopDetailsComponent,
    //DetailsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    CarritoPage,
  ]
})
export class CarritoPageModule {}
