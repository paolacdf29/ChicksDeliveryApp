import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { items, categories, rest } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})

export class DataService {

  restaurants: rest[];
  currentRest: rest;

  constructor(private http: HttpClient) { }

  //Categorias

  getCategories(){
    
    return this.http.get<categories[]>(URL + '/api/start/categories');

  }

  //Restaurantes

  getRests(){

    return new Promise(resolve =>{
      this.http.get( URL + '/api/start/restaurants/users')
        .subscribe(resp =>{
          if(resp['ok']){
            this.restaurants = resp['restaurants'];
            resolve(true);
          }else{
            console.log(resp['error']);
            resolve(false);
          }
        })
    })

  }

  setRest(resti: rest){
    this.currentRest = resti;
  }

  setRestByProduct(producto: items){
    return new Promise(resolve =>{
      const rid = producto.id_r_p
      this.http.get<any>( URL + '/api/start/restaurant/' + rid )
        .subscribe(resp =>{
          if(resp['error']){
            console.log(resp['error']);
            resolve(false);
          }else{
            this.currentRest = resp;
            resolve(true)
          }
        })
    })
    
  }

}
