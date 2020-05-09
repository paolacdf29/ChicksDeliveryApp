import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasspagePageRoutingModule } from './passpage-routing.module';

import { PasspagePage } from './passpage.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasspagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasspagePage]
})
export class PasspagePageModule {}
