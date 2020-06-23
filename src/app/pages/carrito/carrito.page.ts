import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { items } from 'src/app/interfaces/interfaces';
import { precompra } from '../../interfaces/interfaces';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  items: precompra[];
  details = false;

  constructor( public cartService: CartService,
               public dataService: DataService) { }

  ngOnInit() {
    this.items = this.cartService.items;
  }

  //elimina un producto del carrito
  delItem(i){
    this.cartService.deleteItem(i);
  }

}
