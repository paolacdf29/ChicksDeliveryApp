import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { items } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  items: items[];
  details = false;

  constructor( public cartService: CartService,
               public dataService: DataService) { }

  ngOnInit() {
    this.items = this.cartService.items;
  }

  delItem(i){
    this.cartService.deleteItem(i);
  }

}
