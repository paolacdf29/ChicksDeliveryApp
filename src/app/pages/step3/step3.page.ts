import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { items } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})

export class Step3Page implements OnInit{

  items: items[];
  payment = 'card'

  constructor( private modalCtrl: ModalController,
               public cartService: CartService,
               public dataService: DataService) { }

  ngOnInit() {
    this.cartService.totalizar();
  }

  delItem(i : number){
    this.cartService.deleteItem(i);
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: PaymentModalPage,
      componentProps:{
        nombre: 'CheckOut'
      }
    });
    
    await modal.present();

    const { data } = await modal.onDidDismiss()

    console.log('retorno del modal' + data)
  }

  openPayment(){
    this.presentModal();
  }

  sendOrder(){
    //Send the order to the server
    this.cartService.checkout('Cash');
  }

  tipme(event){
    let value = event.detail.value;
    this.cartService.tip = this.cartService.totals.totPrice * (value/100)
    this.cartService.totalizar()
  }

}
