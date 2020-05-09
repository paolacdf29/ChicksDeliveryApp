import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

import { ingredient, customStep } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-custom-product',
  templateUrl: './custom-product.page.html',
  styleUrls: ['./custom-product.page.scss'],
})

export class CustomProductPage implements OnInit {
  
  steps: Observable<customStep[]>;
  currentStep: Observable<customStep[]>;

  ingredient: Observable<ingredient[]>;
  selectedIng = [];
  id_p: number;

  constructor(private Route: ActivatedRoute,
              private cartService: CartService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.id_p = this.Route.snapshot.params.pid;
    this.steps =  this.productosService.getCustomSteps(this.id_p);
  }

  segmentChanged(event){
    const code = event.detail.value + this.productosService.currentProduct.id_P
    this.ingredient = this.productosService.getCustomIngredients(code);
    this.currentStep = this.productosService.getCustomStep(event.detail.value);
  }

  elementClicked(ingredient: ingredient){
    const index = this.selectedIng.indexOf(ingredient);
    if(index > -1){
      this.selectedIng.splice(index, 1);
    }else{
      this.selectedIng.push(ingredient);
    }
  }

  async presentToast(msj : string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }

  getNote(){
    let note = ''
    if(this.selectedIng.length > 0){
      for(let item of this.selectedIng){
        note += item.nombre + ', '
      }
    }

    return note

  }

  getRecargo(){
    let val = 0.0;
    if(this.selectedIng.length > 0){
      for(let item of this.selectedIng){
        val += item.valor;
      }
    }

    return val;
  }

  clean(){
    this.selectedIng = [];
  }

  sendme(){
    this.productosService.updateCurrentProduct(1, this.getNote(), '', '', '', this.getRecargo());
    this.cartService.addToCart(this.productosService.currentProduct);
    this.clean();
    this.presentToast('Your item has been added to the cart.');
    this.navCtrl.navigateForward('/carrito')
  }

}
