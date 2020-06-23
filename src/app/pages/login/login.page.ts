import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: false}) slide: IonSlides;

  //datos del usuario a logear
  user = {
    email: '',
    pass: ''
  }
  //datos del usuario a registrar
  newuser = {
    nombre: '',
    apellido: '',
    mail: '',
    tlf: null,
    direc: '',
    pass1: '',
    pass2: ''
  }
  dbutton= true;

  constructor(public sessionService: SessionService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  //solicita el registro de un nuevo usuario
  async newUser(registroForm: NgForm){
    if (!registroForm.valid){ return;};
    const ok = await this.sessionService.registrar(this.newuser);
    if(ok){
      this.navCtrl.navigateRoot('/home');
    };
  }

  //logea al usuario
  async login(loginForm){
    if (!loginForm.valid){ return;};
    let ok = await this.sessionService.login(this.user.email, this.user.pass);
    if(ok){
      this.navCtrl.navigateRoot('/home');
    }
  }

  //chequea que las dos constraseñas del registro coincidan
  checkpass(){
    if(this.newuser.pass1 == this.newuser.pass2){
      this.dbutton = false;
    }

  }

  //funciones para moverse entre los slides
  ingresar(){
    this.slide.slideTo(0);
  }

  registro(){
    this.slide.slideTo(1);
  }
}
