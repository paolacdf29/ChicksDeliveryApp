import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { items, rest } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})

export class RestaurantPage implements OnInit {

  productos: Observable<items[]>; //Lista de productos
  prodURL: string; //URL de la imagen del rest
  restaurant: rest; //restaurant

  constructor(private navCtrl: NavController,
              public dataService: DataService,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.restaurant = this.dataService.currentRest;
    this.productos = this.productosService.getProductsByRest(this.restaurant.id_r);
    this.prodURL = environment.url;
  }

  //carga el producto en el servicio y redirige a la pagina de especificaciones del producto
  showDetails(item){
    this.productosService.currentProduct = item;
    if(item.id_cat_o == 7){
      this.navCtrl.navigateForward('/custom-product/' + item.id_P);
    }else{
      this.navCtrl.navigateForward('/product');
    }
  }
}
