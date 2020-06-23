import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ingredient, customStep, precompra } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-custom-product',
  templateUrl: './custom-product.page.html',
  styleUrls: ['./custom-product.page.scss'],
})

export class CustomProductPage implements OnInit {
  
  steps: Observable<customStep[]>; //pasos o tipos de ingredientes
  currentStep: Observable<customStep[]>; // paso seleccionado

  ingredient: Observable<ingredient[]>; //ingredientes correspondiente al paso
  selectedIng = []; //ingredientes que el cliente ha seleccionado para el plato

  id_p: number; //id del producto
  notes: string; //comentario general

  constructor(private Route: ActivatedRoute,
              private cartService: CartService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.id_p = this.Route.snapshot.params.pid;
    this.steps =  this.productosService.getCustomSteps(this.id_p);
  }

  //se activa cuando selecciona un paso solicitando los ingredientes correspondientes al mismo
  segmentChanged(event){
    //solicitud de los ingredientes
    const code = event.detail.value + this.productosService.currentProduct.id_P
    this.ingredient = this.productosService.getCustomIngredients(code);
    //solicutud de los detalles del paso
    this.currentStep = this.productosService.getCustomStep(event.detail.value);
  }

  //agrega/quita un ingrediente de la lista al seleccionar/deseleccionar el checkbox
  elementClicked(ingredient: ingredient){
    const index = this.selectedIng.indexOf(ingredient);
    if(index > -1){
      this.selectedIng.splice(index, 1);
    }else{
      this.selectedIng.push(ingredient);
    }
  }

  // convierte la lista de ingredientes a string y la agrega a los comentarios
  getNote(){
    if(this.selectedIng.length > 0){
      for(let item of this.selectedIng){
        this.notes += item.nombre + ', '
      }
    }
  }

  // devuelve la suma del costo de los ingredientes seleccionados
  getRecargo(){
    let val = 0.0;
    if(this.selectedIng.length > 0){
      for(let item of this.selectedIng){
        val += item.valor;
      }
    }

    return val;
  }

  //limpia los valores de la lista y el comentario
  clean(){
    this.selectedIng = [];
    this.notes = ''
  }

  //agrega el item al carrito
  sendme(){
    this.getNote();
    const item: precompra = {
      id_p: this.id_p,
      nombre: this.productosService.currentProduct.Nombre,
      comentario: this.notes,
      cantidad: 1,
      recargo: 0,
      price: this.getRecargo()
    }
    this.cartService.addToCart(item);
    this.clean();
    this.presentToast('Your item has been added to the cart.');
    this.navCtrl.navigateForward('/carrito')
  }

  async presentToast(msj : string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }

}
