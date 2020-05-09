import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step4PageRoutingModule } from './step4-routing.module';

import { Step4Page } from './step4.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step4PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Step4Page]
})
export class Step4PageModule {}
