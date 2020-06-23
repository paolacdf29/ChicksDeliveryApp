import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.page.html',
  styleUrls: ['./step4.page.scss'],
})
export class Step4Page implements OnInit {
  
  details: boolean = true; //permite ver los detalles o no dependiendo si es un user logeado

  constructor(private activeRoute : ActivatedRoute,
              public ordersService: OrdersService) { }

  ngOnInit() {
    const setting = this.activeRoute.snapshot.params.details
    if(setting == 'nodetails'){
      this.details = false;
    }
  }

  doRefresh(event) {
    this.ordersService.refreshOrder();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
