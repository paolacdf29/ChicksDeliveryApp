import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { NavController, AlertController, ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { user } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})

export class SessionService {

  user: user[] = null;
  token: string;
  alert = '';

  constructor(private http : HttpClient,
              private storage: Storage,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  async cargarToken( ){
  
    this.token = await this.storage.get('token') || null;
  
  }

  async guardarToken(token: string){

    this.token = token;
    await this.storage.set('token', token);

  }

  async login(email: string, password: string){

    return new Promise (resolve=>{
      const data = {email, password}
  
      this.http.post<any>(URL + '/api/login', data)
        .subscribe( respuesta =>{
            if(respuesta['ok']){
              this.guardarToken(respuesta['token']);
              this.validarToken();
              resolve(true);
            }else{
              this.token = null;
              this.storage.clear();
              this.putAlert(respuesta['msj'])
              resolve(false);
            }
          })
    })

  }

  async validarToken(): Promise<boolean>{
    await this.cargarToken();

    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false)
    }

    return new Promise(resolve=>{
      
      let headers = new HttpHeaders({
        "token" : this.token
      });

      this.http.get(URL + '/api/users', { headers })
          .subscribe(resp=>{
            if(resp['ok']){
              this.user = resp['user'];
              resolve(true);
            }else{
              console.log(resp['error']);
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          })
    });
  }

  registrar(usuario){
  
    return new Promise(resolve=>{
      this.http.post(URL + '/api/users/registro', usuario)
          .subscribe(respuesta=>{
            console.log(respuesta);
            if(respuesta['ok']){
              this.guardarToken(respuesta['token']);
              this.cargarToken();
              resolve(true);
            }else{
              this.token = null;
              this.storage.clear();
              this.presentAlert(respuesta['msj'])
              if(respuesta['error']){
                this.presentAlert("Sorry we can't register right now, please try again later");
                console.log(respuesta['error'])
              }
              this.navCtrl.navigateRoot('/');
              resolve(false)
            }

          })
    })
  }

  async presentAlert(msj : string) {
    const alert = await this.alertCtrl.create({
      header: 'Ups',
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  getUser(){
    return this.user;
  }

  logOut(){
    this.token = null;
    this.user = null;
    this.storage.clear();
    console.log('user out')
    return this.http.get(URL + '/api/login/logout');
  }

  putAlert(msj: string){
    this.alert = msj;
    this.presentAlert(msj);
  }

  getToken(){
    if(this.token){
      return this.token;
    }else{
      this.validarToken();
      return this.token;
    }
  }

  loadSession(){
    this.cargarToken();
    this.validarToken();
  }

  updateuser(user){
    return new Promise(resolve =>{

      let headers = new HttpHeaders({
        "token" : this.token
      });
      const body = user;
      this.http.put(URL + '/api/users/editar', body, {headers})
        .subscribe(resp =>{
          if(resp['ok']){
            resolve(true);
          }else{
            console.log(resp['error']);
            resolve(false);
          }
        })
    })
  }

  changepass(passwords: any){
    return new Promise(resolve =>{

      let headers = new HttpHeaders({
        "token" : this.token
      });

      let body ={
        oldpass: passwords.current,
        newpass1: passwords.new
      }

      this.http.put(URL + '/api/users/changepass', body, {headers})
        .subscribe(resp =>{
          if(resp['ok']){
            this.presentToast(resp['msj']);
            resolve(true);
          }else{
            console.log(resp['msj'])
            this.presentToast(resp['msj']);
            resolve(false)
          }
        })
    })
  }

  async presentToast(msj: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      position: "middle",
      duration: 1000
    });
    toast.present();
  }

  islogged(){
    this.cargarToken();

    if(this.token == null){
      return false;
    }else{
      return true;
    }

  }

}
