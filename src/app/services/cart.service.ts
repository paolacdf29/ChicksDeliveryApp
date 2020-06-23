import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavController, ToastController, AlertController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { precompra } from '../interfaces/interfaces';
import { DataService } from './data.service';
import { SessionService } from './session.service';
import { ProductosService } from './productos.service';
import { OrdersService } from './orders.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})

export class CartService {

  items : precompra[] = []; //productos agregados al carrito
  extrainfo : string; //Comentarios generales
  totals = {
    totItems : 0,
    totPrice : 0
  } //Total de items y total de precios(suma del valor de todos los items)
  subtotal: number; 
  tip: number = 0; //Propinas
  tax: number; // Impuestos
  payment: number; //subtotal + tips + tax
  alerta: string;
  serviceFee: number = 0;

  constructor(private sessionService: SessionService,
              private http: HttpClient,
              private navCtrl: NavController,
              private dataService: DataService,
              private productosService: ProductosService,
              private ordersService: OrdersService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController){

  }

  //---------------operaciones basicas del carrito-------------------
  //agrega un item del carrito
  addToCart(product: precompra) {
    this.totals.totItems += product.cantidad;
    this.totals.totPrice += (product.price + product.recargo)*product.cantidad;
    this.items.push(product);
    this.productosService.currentProduct = null;
  }

  //elimina un item del carrito
  deleteItem(index: number) {
    let delitem = this.items[index];
    this.totals.totItems -= delitem.cantidad;
    this.totals.totPrice -= (delitem.price + delitem.recargo)*delitem.cantidad;
    this.items.splice(index, 1);
    return this.items;
  }

  //Configura el comentario general
  setExtraInfo(info){
    this.extrainfo = info.delivertype + ': ' + info.timeSet;

    if(info.comentarios != ''){
      this.extrainfo += ', Comments: ' + info.comentarios;
    }

    if(this.sessionService.islogged()){
      if(info.changeAddress){
        this.extrainfo += ', New address: ' + info.newAddress;
      }
    }else{
      this.extrainfo += `, Email: ${info.newMail}, Phone: ${info.newPhone}, Client: ${info.newUser}, Address: ${info.newAddress}`;

    }
  }

  //Devuelve los items
  getItems() {
    return this.items;
  }

  //Devuelve el total
  gettotal(){
    return this.totals.totPrice;
  }

  //Reinicia los valores de las variables
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

  //--------------pago y envio del contenido del carrito al backend-----------------

  //Suma los tax, tips, fees al total
  totalizar(){
    this.subtotal = this.totals.totPrice + this.dataService.currentRest.deli_fee + this.serviceFee;
    this.tax = this.subtotal * 0.07;
    this.payment = this.subtotal + this.tax +this.tip;
  }

  //Solicita un pago con tarjeta de credito (square payments)
  sqPayCall(nonce: string){

    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "Accept": "application/json",
        'Content-Type': 'application/json'
      });
      //this.totalizar();
      const body={
        nonce: nonce,
        payamount: this.payment,
      }
  
      this.http.post(URL + '/api/sqPay/process-payment', body, {headers})
          .subscribe(respuesta =>{
            if (respuesta['title'] == 'Payment Successful'){
              console.log(respuesta['result']); //este es el id de la transaccion
              this.checkout(respuesta['result']); //Se solicita crear la orden
              this.presentToast('Payment complete successfully') //Yayyy
              resolve('true')
            }else if (respuesta['title'] == 'Payment Failure'){
              console.log(respuesta['result']);
              this.alerta = respuesta['result'];
              this.presentToast('Payment failed to complete!')
              resolve('false')
            }
          })

    })

  }

   //Crea la orden y solicita añadir los items a la orden
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

      if(this.sessionService.islogged()){
        this.http.post( URL + '/api/step3/newdeli', body, {headers})
            .subscribe(respuesta=>{
              if(respuesta['ok']){
                this.sendItems(respuesta['id_d']);
                this.presentAlert(`Your order has benn successfully created, the id number is${respuesta['id_d']} use this number to track the order or ask for the status to the restaurant`)
                console.log('id de la orden : '+ respuesta['id_d']);
                resolve(respuesta['id_d'])
              }else{
                console.log(respuesta['error'])
                resolve('error')
              }
            })        
      }else{
        this.http.post(URL + '/api/step3/faker/newdeli', body)
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
      }


    })
  }

  //itera sobre la lista de productos y solicita añadirlos
  sendItems(oid: number){
    for(let item of this.items){
      item.id_order = oid
      this.sendItem(item);
    }
    if(this.sessionService.islogged()){
      this.ordersService.getOrder(oid);
    }else{
      this.ordersService.getOrdersimple(oid);
    }
    this.navCtrl.navigateForward('/step4');
    this.clearCart();
  }

  //añade un producto a la orden
  sendItem(item: precompra){
    this.http.post(URL + '/api/product', item)
        .subscribe(respuesta =>{
          if(respuesta['ok']){
            console.log('se ha guardado el item exitosamente');
          }else{
            console.log(respuesta['error'])
          }
        })

  }

  async presentToast(msj){
    const toast = await this.toastCtrl.create({
      message: msj,
      position: "middle",
      duration: 1000
    })

    toast.present();
  }

  async presentAlert(msj){
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

}
