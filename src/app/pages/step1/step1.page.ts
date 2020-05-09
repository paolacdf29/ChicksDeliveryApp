import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { items } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { ProductosService } from '../../services/productos.service';

const URL = environment.url;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {

  productos: Observable<items[]>;
  textoBusqueda: string = '';
  currentCategorie: number = 0;
  prodURL: string;

  constructor( public dataService : DataService,
               public productosService: ProductosService,
               private activeRoute: ActivatedRoute,
               private navCtrl: NavController) { }

  ngOnInit() {
    if(this.activeRoute.snapshot.params.cid){
       const cid = this.activeRoute.snapshot.params.cid
       this.productos = this.productosService.getProductsByCat(cid);
    }else{
      this.productos = this.productosService.getProducts();    
    }

    this.prodURL = URL;
  }

  escuchaclick( id_p : number ){
    console.log('Click en: ', id_p)

  }

  buscar( event ){
    this.textoBusqueda = event.detail.value

  }

  onClick( data: items ){
    this.dataService.setRestByProduct(data);
    this.productosService.currentProduct = data;
    if(data.id_cat_o == 7){
      this.navCtrl.navigateForward('/custom-product/' + data.id_P);
    }else{
      this.navCtrl.navigateForward('/product');
    }
  }

}
