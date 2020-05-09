import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data.service';
import { categories, orden, rest } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';
import { OrdersService } from '../../services/orders.service';
import { environment } from 'src/environments/environment';

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

  constructor(public dataService: DataService,
              public sessionService: SessionService,
              public ordersService: OrdersService) { }

  ngOnInit() {
    this.categories = this.dataService.getCategories();
    this.dataService.getRests();
  }

  gethome(){
    this.activeOrders = this.ordersService.getActiveOrders();
    this.ordersService.getCancelOrders();
  }

  showOrder(id_d: number){
    this.ordersService.getOrder(id_d);
  }

  setRestaurant(restaurant: rest){
    this.dataService.setRest(restaurant);
  } 
}
