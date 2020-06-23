import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { orden } from 'src/app/interfaces/interfaces';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  activeOrders : Observable<orden[]>; //lista de ordenes en curso


  constructor(private ordersService: OrdersService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.activeOrders = this.ordersService.getActiveOrders();
  }

  //solicita una orden con el id
  trackmepls(event){
    this.ordersService.getOrdersimple(event.target.value); 
  }

  //envia la orden al servcio y abre la pagina de detalles
  async showOrder(oid: number){
    const ok = await this.ordersService.getOrder(oid);
    if(ok){
      this.navCtrl.navigateForward('/step4');
    }
  }

}
