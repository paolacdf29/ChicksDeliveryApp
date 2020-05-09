import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromosPageRoutingModule } from './promos-routing.module';

import { PromosPage } from './promos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PromosPage]
})
export class PromosPageModule {}
