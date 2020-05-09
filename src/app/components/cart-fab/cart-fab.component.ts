import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-fab',
  templateUrl: './cart-fab.component.html',
  styleUrls: ['./cart-fab.component.scss'],
})
export class CartFabComponent implements OnInit {

  constructor( public cartService: CartService ) { }

  ngOnInit() {}

}
