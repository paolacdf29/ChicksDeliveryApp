import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { OrdersService } from '../../services/orders.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(public ordersService: OrdersService,
              private session: SessionService,
              private navCtrl: NavController) {
   }

  ngOnInit() {
    this.session.loadSession();
    this.ordersService.getCancelOrders();
    this.ordersService.getFinishedOrders();
  }

  //envia la orden al servicio y abre la pagina de detalles de la orden
  async showOrder(id_d: number){
    if(await this.ordersService.getOrder(id_d)){
      this.navCtrl.navigateForward('/details');
    };

  }
}
