import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { orden } from '../interfaces/interfaces';
import { SessionService } from './session.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  CurrentOrden;
  cancelOrders: orden[];
  finishedOrders: orden[];

  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private toastCtrl: ToastController,
              private navCtrl: NavController) { }

  
  getOrder(oid: number){
    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "token" : this.sessionService.token
      });
  
      this.http.get(URL + '/api/step4/' + oid, {headers})
          .subscribe(respuesta=>{
            if(respuesta['ok']){
              this.CurrentOrden = respuesta['order'];
              console.log('orden cargada');
              this.navCtrl.navigateForward('/step4')
              resolve(true);
            }else{
              console.log('algo ha salido mal');
              resolve(false);
            }
          })
    })

  }

  getOrdersimple(oid: number){
    return new Promise(resolve =>{
  
      this.http.get(URL + '/api/step4/simple/' + oid)
          .subscribe(respuesta=>{
            if(respuesta['ok']){
              if(respuesta['msj']){
                this.presentToast('Ups, we could not find the order')
                resolve(false)
              }else{
                console.log('orden cargada');
                this.CurrentOrden = respuesta['order'];
                this.navCtrl.navigateForward('/step4/nodetails');
                resolve(true);
              }
            }else{
              console.log('algo ha salido mal');
              resolve(false);
            }
          })
    })

  }

  refreshOrder(){
  
    this.getOrder(this.CurrentOrden.id_d)
  
  }

  getActiveOrders(){
    const headers = new HttpHeaders({
      "token" : this.sessionService.token
    });

    return this.http.get<orden[]>(URL + '/api/start/', { headers });
    
  }

  getCancelOrders(){
    
    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "token" : this.sessionService.getToken()
      });
      
      this.http.get(URL + '/api/start/cancels', { headers })
        .subscribe(resp =>{
          if(resp['ok']){
            this.cancelOrders = resp['orders'];
            resolve(true);
          }else{
            console.log(resp['error']);
            resolve(false);
          }
        });

    })
  }

  getFinishedOrders(){
    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "token" : this.sessionService.getToken()
      });
      
      this.http.get(URL + '/api/start/finished', { headers })
        .subscribe(resp =>{
          if(resp['ok']){
            this.finishedOrders = resp['orders'];
            resolve(true);
          }else{
            console.log(resp['error']);
            resolve(false);
          }
        });

    })
  }

  async presentToast(msj: string){
    const toast =await this.toastCtrl.create({
      message: msj,
      duration: 1000
    })

    toast.present();
  }
}
