import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { items } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {

  productos: Observable<items[]>; //lista de productos
  textoBusqueda: string = ''; //texto de busqueda
  currentCategorie: number = 0; //Categoria de los productos
  prodURL: string; //URL para las imagenes

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
    this.prodURL = environment.url;;
  }

  //Filtra los productos de acuerdo con el texto de busqueda
  buscar( event ){
    this.textoBusqueda = event.detail.value
  }

  //configura el restaurante actual y producto actual y luego envia a la pagina del producto
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
