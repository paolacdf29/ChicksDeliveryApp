import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { items } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})

export class Step3Page implements OnInit{

  items: items[]; //productos agregados al carrito
  payment: string = 'card'; //tipo de pago
  logged: boolean; //verdad si es un usuario logeadp

  constructor( private modalCtrl: ModalController,
               public cartService: CartService,
               public dataService: DataService,
               private sessionService: SessionService) { }

  ngOnInit() {
    this.cartService.totalizar();
    this.logged = this.sessionService.islogged();
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

  //abre la pagina de pagos con square
  openPayment(){
    this.presentModal();
  }

  //envia la orden directamente(pagos en efectivo)
  sendOrder(){
    //Send the order to the server
    this.cartService.checkout('Cash');
  }

  //configura la propina
  tipme(event){
    let value = event.detail.value;
    this.cartService.tip = this.cartService.totals.totPrice * (value/100)
    this.cartService.totalizar()
  }

}
