import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductosService } from '../../services/productos.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  orderItems: Observable<any[]>; //productos en el pedido

  constructor(public ordersService: OrdersService,
              private productosService: ProductosService) { }

  ngOnInit() {
    this.orderItems = this.productosService.getProductsByOrder(this.ordersService.CurrentOrden.id_d);
  }

}
