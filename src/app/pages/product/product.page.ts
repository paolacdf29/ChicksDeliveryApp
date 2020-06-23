import { Component, OnInit} from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ingredient, precompra } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';

const URL = environment.url + "/images/products/";

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {

  ingredientes: Observable<ingredient[]>; //ingredientes para los sides y extras
  prodURL: string; //URL de la imagen
  cantidad = 1; //Cantidad del producto (por defecto es uno solo)
  notes = ''; //Comentarios
  extras = []; //Lista de ingredientes extras
  sides = []; //Lista de ingredientes sides
  nos = []; //Lista de ingredientes a quitar
  type = ''; //Tipo de ingredientes a mostrar (sides, extras, nos)
  recargo = 0; //Recargos por ingredientes extras y sides
  size = 1; //Tamaño del producto (por defecto es individual)

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

  //le da un valor a "type" y con esto activa la lista de productos
  segmentChanged(event){
    this.type = event.detail.value;
  }

  //Agrega un ingrediente a su lista correspondiente
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

  //Agrega un ingrediente a la lista de ingredientes
  seethis(event){
    if(event.target.value != ''){
      const newingre = {
        type : 'nos',
        nombre : event.target.value,
        valor: 0
      }
      this.addIngredient(newingre)
    }
  }

  //elimina un ingrediente de las listas
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
  
  //convierte los arreglos/listas de ingredientes en un string
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

  //cambia la cantidad de productos
  setQuantity(option: string){
    if(option == 'remove'){
      if(this.cantidad > 1){
        this.cantidad -= 1;
      }
    }else if(option == 'add'){
      this.cantidad += 1;
    }
  }

  //cambia el temaño del producto
  chengesize(){
    console.log(this.size);
  }

  //Agrega el producto al carrito con todos las especificaciones
  addItem(){
    let item: precompra = {
      id_p: this.productosService.currentProduct.id_P,
      nombre: this.productosService.currentProduct.Nombre,
      comentario: this.notes,
      cantidad: this.cantidad,
      dismiss: this.arryToStr(this.nos),
      extras: this.arryToStr(this.extras),
      sides: this.arryToStr(this.sides),
      recargo: this.recargo,
      price: 0
    }

    if(this.size == 1){
      item.price = this.productosService.currentProduct.precio;
      item.comentario += ', Size individual';
    }else if(this.size ==2){
      item.price = this.productosService.currentProduct.big;
      item.comentario += ', Size Large';
    }else if(this.size == 3){
      item.price = this.productosService.currentProduct.xl;
      item.comentario += ', Size XL';
    }

    this.cartService.addToCart(item);
    this.resetPage();
    this.presentToast('Your item has been added to the cart.');
  }

  //resetea todos los valores a los valores inciales
  resetPage(){
    this.cantidad = 1;
    this.notes = '';
    this.extras = [];
    this.sides = [];
    this.nos = [];
    this.type = '';
    this.recargo = 0;
  }

}
