import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step3PageRoutingModule } from './step3-routing.module';

import { Step3Page } from './step3.page';
import { ComponentsModule } from '../../components/components.module';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';

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
  ],
  declarations: [
    Step3Page,
    PaymentModalPage,

  ]
})
export class Step3PageModule {}
