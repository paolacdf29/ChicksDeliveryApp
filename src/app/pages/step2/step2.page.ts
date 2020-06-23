import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { user } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})

export class Step2Page implements OnInit {

  users: user[]; // Datos del usuario
  orderInfo={
    delivertype: 'Delivery',
    comentarios: '',
    timeSet: 'As soon as posible',
    changeAddress: false,
    newUser: null,
    newAddress: null,
    newPhone: null,
    newMail: null
  }; //Datos generales del pedido
  logged: boolean; //true si es un usuario logeado

  constructor(private cartService: CartService,
              private sessionService: SessionService,
              private navCtrl: NavController,
              public dataService: DataService,
              private alertCtrl: AlertController) { }

  ngOnInit(){
    this.logged = this.sessionService.islogged();
    if(this.logged){
      this.sessionService.validarToken();
      this.users = this.sessionService.getUser();
    }
  }

  //envia la informacion al servicio cart para que la agregue a la orden
  onSubmitTemplate(){
    this.cartService.setExtraInfo(this.orderInfo);
    if(!this.logged){
      if(this.orderInfo.newPhone || this.orderInfo.newMail){
        this.presentAlert()
      }else{
        if(this.orderInfo.delivertype == "Delivery"){
          this.presentSimpleAlert("You most provide some basic info so the restaurant can send you the order");
        }else{
          this.presentSimpleAlert("You most provide some basic info so the restaurant knows who's the order")
        }
      }
    }else{
      this.navCtrl.navigateForward('/step3');
    }
  }

  //se activa cuando el user logeado desea cambiar su direccion principal
  changeMyAddress(){
      this.orderInfo.changeAddress = !this.orderInfo.changeAddress;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Wait!',
      message: 'You have decided to order without loging in, please keep the order Id to track the status',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        {
          text: 'Login',
          handler: () => {
            this.navCtrl.navigateForward('/login');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.navigateForward('/step3');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentSimpleAlert(msj: string){
    const alert = await this.alertCtrl.create({
      header: 'Warning!',
      message: msj,
      buttons: [
        {
          text: 'Ok',
          role: "cancel "
        }
      ]
    });

    await alert.present();
  }
}
