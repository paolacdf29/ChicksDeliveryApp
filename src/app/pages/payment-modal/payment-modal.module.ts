import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentModalPage } from './payment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentModalPage
  ],
  exports: [
    PaymentModalPage
  ],
  declarations: [PaymentModalPage]
})
export class PaymentModalPageModule {}
