import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { categories } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  item: Observable<categories[]>;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    //this.item = this.dataservice.getCategories();
  }

}
