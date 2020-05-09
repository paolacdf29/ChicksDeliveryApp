import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { CartService } from '../../services/cart.service';
import { ingredient } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { environment } from 'src/environments/environment';

const URL = environment.url + "/images/products/";

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {

  ingredientes : Observable<ingredient[]>;
  prodURL: string;
  cantidad = 1;
  notes = '';
  extras = [];
  sides = [];
  nos = [];
  type = '';
  recargo = 0;
  size = 1;

  constructor( private toastCtrl: ToastController, 
               private cartService: CartService,
               public productosService: ProductosService) { }

  ngOnInit() {
    this.ingredientes = this.productosService.getIngredients();
    this.prodURL = URL + this.productosService.currentProduct.pic;
  }

  async presentToast(msj : string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }

  segmentChanged(event){
    this.type = event.detail.value;
  }

  addIngredient( ingredient ){
    if(ingredient.type == 'side'){
      this.sides.push(ingredient);

    }else if(ingredient.type == 'extra'){
      this.extras.push(ingredient);

    }else if(ingredient.type == 'nos'){
      this.nos.push(ingredient);

    }

    if(ingredient.valor > 0){
      this.recargo += ingredient.valor;
    }
  }

  quitIngredient(i: number, item){
    if(item.type == 'side'){
      this.sides.splice(i, 1);

    }else if(item.type == 'extra'){
      this.extras.splice(i, 1);

    }if(item.type == 'nos'){
      this.nos.splice(i, 1);
    }

    if(item.valor > 0.0){
      this.recargo -= item.valor;
    }
  }

  onSubmitTemplate(){

  }
  
  addItem(){
    if(this.size != 1){
      
      if(this.size ==2){
        this.recargo += this.productosService.currentProduct.big -  this.productosService.currentProduct.precio;
        this.notes += 'Size Large';
      }else{
        this.recargo += this.productosService.currentProduct.big - this.productosService.currentProduct.precio;
        this.notes += 'Size XL';
      }
    }
    this.productosService.updateCurrentProduct(this.cantidad, this.notes, this.arryToStr(this.sides), this.arryToStr(this.extras), this.arryToStr(this.nos), this.recargo)
    this.cartService.addToCart(this.productosService.currentProduct);
    this.resetPage();
    this.presentToast('Your item has been added to the cart.');
  }

  arryToStr(ingredientes: ingredient[]){
    let ingStrList = '';
    if(ingredientes.length > 1){
      for(let ing of ingredientes){
        ingStrList += ing.nombre + ', ';
      }
    }else if(ingredientes.length == 1){
      ingStrList = ingredientes[0].nombre;
    }

    return ingStrList
  }

  resetPage(){
    this.cantidad = 1;
    this.notes = '';
    this.extras = [];
    this.sides = [];
    this.nos = [];
    this.type = '';
    this.recargo = 0;
  }

  setQuantity(option: string){
    if(option == 'remove'){
      if(this.cantidad > 1){
        this.cantidad -= 1;
      }
    }else if(option == 'add'){
      this.cantidad += 1;
    }
  }

  chengesize(){
    console.log(this.size);
  }
}
