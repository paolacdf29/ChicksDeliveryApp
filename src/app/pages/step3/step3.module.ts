import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step3PageRoutingModule } from './step3-routing.module';

import { Step3Page } from './step3.page';
import { ComponentsModule } from '../../components/components.module';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';

@NgModule({
  entryComponents: [
    PaymentModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step3PageRoutingModule,
    ComponentsModule,
    PaymentModalPageModule
  ],
  declarations: [
    Step3Page,
  ]
})
export class Step3PageModule {}
