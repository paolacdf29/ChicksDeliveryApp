import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { items } from '../interfaces/interfaces';
import { DataService } from './data.service';
import { SessionService } from './session.service';
import { ProductosService } from './productos.service';
import { OrdersService } from './orders.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})

export class CartService {

  items : items[] = [];
  extrainfo : string;
  totals = {
    totItems : 0,
    totPrice : 0
  }
  subtotal: number;
  tip: number = 0; 
  tax: number;
  payment: number;

  constructor(private sessionService: SessionService,
              private http: HttpClient,
              private navCtrl: NavController,
              private dataService: DataService,
              private productosService: ProductosService,
              private ordersService: OrdersService){

  }

  addToCart(product) {
    this.totals.totItems += product.cantidad;
    this.totals.totPrice += (parseFloat(product.precio) + parseFloat(product.recargo))*parseFloat(product.cantidad);
    this.items.push(product);
    this.productosService.currentProduct = null;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.totals.totItems = 0;
    this.totals.totPrice = 0;
    this.tax = 0;
    this.tip = 0;
    this.subtotal = 0;
    this.payment = 0;
    return this.items;
  }

  deleteItem(index: number) {
    let delitem = this.items[index];
    this.totals.totItems -= delitem.cantidad;
    this.totals.totPrice -= (delitem.precio + delitem.recargo)*delitem.cantidad;
    this.items.splice(index, 1);
    return this.items;
  }

  gettotal(){
    return this.totals.totPrice;
  }

  setExtraInfo(info, address: string){
    this.extrainfo = info.delivertype + ': ' + info.timeSet;

    if(info.comentarios != ''){
      this.extrainfo += ', Comments: ' + info.comentarios;

    }

    if(info.changeAddress){
      this.extrainfo += ', New address: ' + address;

    }

    console.log(this.extrainfo)
  }

  sendItem(oid: number, item: items){


    const headers = new HttpHeaders({
      "token" : this.sessionService.token
    });

    let body = {
      id_order: oid,
      id_p: item.id_P,
      comentario: item.comentario,
      dismiss: item.dismiss,
      extras: item.extras,
      sides: item.sides,
      cantidad: item.cantidad,
      recargo: item.recargo
    }

    this.http.post(URL + '/api/product', body, {headers})
        .subscribe(respuesta =>{
          if(respuesta['ok']){
            console.log('se ha guardado el item exitosamente');
          }else{
            console.log(respuesta['error'])
          }
        })

  }

  sendItems(oid: number){

    for(let item of this.items){
      this.sendItem(oid, item);
    }
    this.ordersService.getOrder(oid);
    this.navCtrl.navigateForward('/step4');
    this.clearCart();
  }

  checkout(paymentType: string){

    return new Promise(resolve=>{

      const headers = new HttpHeaders({
        "token" : this.sessionService.token
      });

      let body = {
        coment: this.extrainfo,
        id_r: this.dataService.currentRest.id_r,
        total: this.payment,
        payment: paymentType,
        tax: this.tax,
        tip: this.tip
      }


      this.http.post( URL + '/api/step3/newdeli', body, {headers})
          .subscribe(respuesta=>{
            if(respuesta['ok']){
              this.sendItems(respuesta['id_d']);
              console.log('id de la orden : '+ respuesta['id_d']);
              resolve(respuesta['id_d'])
            }else{
              console.log(respuesta['error'])
              resolve('error')
            }
          })

    })
  }

  sqPayCall(nonce){

    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "Accept": "application/json",
        'Content-Type': 'application/json'
      });
  
      const body={
        nonce: nonce,
        money: this.totals.totPrice
      }
  
      this.http.post(URL + '/api/sqPay/process-payment', body, {headers})
          .subscribe(respuesta =>{
            if (respuesta['title'] == 'Payment Successful'){
              console.log(respuesta['result']);
              resolve('true')
            }else if (respuesta['title'] == 'Payment Failure'){
              console.log(respuesta['result']);
              resolve('false')
            }
          })

    })

  }


  totalizar(){
    this.subtotal = this.totals.totPrice + this.dataService.currentRest.deli_fee + 2.25;
    this.tax = this.subtotal * 0.07;
    this.payment = this.subtotal + this.tax +this.tip;
  }

  sendSqPayment(){
    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "token": this.sessionService.token
      });
  
      const body={
        payamount: this.totals.totPrice
      }
  
      this.http.post(URL + '/api/sqPay/request-payment', body, {headers})
          .subscribe(respuesta =>{
            if (respuesta['ok']){
              console.log('monto enviado satisfactoriamente');
              resolve('true')
            }else{
              console.log('ups algo salio mal');
              resolve('false')
            }
          })

    })
    
  }


}
