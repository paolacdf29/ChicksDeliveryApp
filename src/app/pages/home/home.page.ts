import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { categories, orden, rest } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.service';
import { SessionService } from '../../services/session.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  categories : Observable<categories[]>
  activeOrders : Observable<orden[]>;
  catsSlides = {
    slidesPerView : 3
  };
  imgURL = environment.url;
  logged: boolean;

  constructor(public dataService: DataService,
              public sessionService: SessionService,
              public ordersService: OrdersService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.categories = this.dataService.getCategories();
    this.dataService.getRests();
    this.logged = this.sessionService.islogged();
    if(this.logged){
      this.activeOrders = this.ordersService.getActiveOrders();
    }
  }

  //redirigir a la pagina de estado de la orden
  async showOrder(id_d: number){
    const ok =  await this.ordersService.getOrder(id_d);
    if(ok){
      this.navCtrl.navigateForward('/step4')
    }
  }

  //coloca el restaurant seleccionado como el resturant activo
  setRestaurant(restaurant: rest){
    this.dataService.setRest(restaurant);
  } 
}
