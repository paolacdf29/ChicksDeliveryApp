import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

import { DataService } from '../../services/data.service';
import { items, rest } from 'src/app/interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})

export class RestaurantPage implements OnInit {

  productos: Observable<items[]>;
  prodURL: string;
  restaurant: rest;

  constructor(public dataService: DataService,
              private navCtrl: NavController,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.restaurant = this.dataService.currentRest;
    this.productos = this.productosService.getProductsByRest(this.restaurant.id_r);
    this.prodURL = URL;
  }

  showDetails(item){
    this.productosService.currentProduct = item;
    if(item.id_cat_o == 7){
      this.navCtrl.navigateForward('/custom-product/' + item.id_P);
    }else{
      this.navCtrl.navigateForward('/product');
    }
  }
}
