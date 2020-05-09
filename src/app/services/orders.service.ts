import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
              private sessionService: SessionService) { }

  
  getOrder(oid: number){
    return new Promise(resolve =>{
      
      const headers = new HttpHeaders({
        "token" : this.sessionService.token
      });
  
      this.http.get(URL + '/api/step4/' + oid, {headers})
          .subscribe(respuesta=>{
            if(respuesta['ok']){
              this.CurrentOrden = respuesta['order'];
              resolve(true);
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
}
