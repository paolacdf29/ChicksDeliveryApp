import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { items, customStep, ingredient } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { DataService } from './data.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})

export class ProductosService {

  currentProduct: items;

  constructor(private http: HttpClient,
              private sessionservice: SessionService,
              private dataService: DataService) { }

  
  getProducts(){

    return  this.http.get<items[]>(URL + '/api/product');
  
  }

  getProductsByCat(id_cat: number){
  
    return this.http.get<items[]>(URL + '/api/product/category/' + id_cat);
  
  }

  getProductsByRest(id_r: number){
  
    return this.http.get<items[]>(URL + '/api/product/restaurant/' + id_r);
  
  }

  getProductsByOrder(id_d: number){
    const headers = new HttpHeaders({
      "token" : this.sessionservice.token
    });

    return this.http.get<any[]>(URL + '/api/product/details/' + id_d, {headers});
  }

  updateCurrentProduct(cantidad: number, comentario: string, sides: string, extras: string, nos: string, recargo: number){
    this.currentProduct.sides = sides;
    this.currentProduct.extras = extras;
    this.currentProduct.dismiss = nos;
    this.currentProduct.cantidad = cantidad;
    this.currentProduct.comentario = comentario;
    this.currentProduct.recargo = recargo;    
    return this.currentProduct
  }

  getCustomSteps(id_p: number){
    
    return this.http.get<customStep[]>(URL + '/api/product/custom/' + id_p)
       
  }

  getCustomStep(id_cc: number){   
    return this.http.get<customStep[]>(URL + '/api/product/custom/' + id_cc)
       
  }
  
  getIngredients(){
    const id_r = this.dataService.currentRest.id_r;
    return this.http.get<ingredient[]>(URL + '/api/product/ingredients/all/' + id_r);

  }

  getCustomIngredients(type: string){
    
    return this.http.get<ingredient[]>(URL + '/api/product/ingredients/custom/' + type);

  }
}
