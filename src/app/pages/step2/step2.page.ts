import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { user } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})

export class Step2Page implements OnInit {

  users: user[];

  orderInfo={
    delivertype: 'Delivery',
    changeAddress: false,
    comentarios: '',
    timeSet: 'As soon as posible'
  }

  newAddress = ''

  constructor(private cartService: CartService,
              private sessionService: SessionService,
              private navCtrl: NavController,
              public dataService: DataService) { }

  ngOnInit(){
    this.users = this.sessionService.getUser();
  }

  onSubmitTemplate(){
    if(!this.users){
      this.navCtrl.navigateRoot('/')
    }else{
      this.navCtrl.navigateForward('/step3')
    }
    this.cartService.setExtraInfo(this.orderInfo, this.newAddress);
  }

  changeMyAddress(){
    if(this.orderInfo.changeAddress == false){
      this.orderInfo.changeAddress = true;
    }else{
      this.orderInfo.changeAddress = false;
    }
  }

}
