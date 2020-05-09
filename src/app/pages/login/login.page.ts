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

  user = {
    email: '',
    pass: ''
  }
  
  newuser = {
    nombre: '',
    apellido: '',
    mail: '',
    tlf: 0,
    direc: '',
    pass1: '',
    pass2: ''
  }

  dbutton= true;


  constructor(public sessionService: SessionService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log( this.user )
  }

  newUser( registroForm: NgForm ){
    if (!registroForm.valid){ return;};
    this.sessionService.registrar(this.newuser);
    this.navCtrl.navigateRoot('/home');
  }

  async login( loginForm ){
    if (!loginForm.valid){ return;};
    let ok = await this.sessionService.login(this.user.email, this.user.pass);
    if(ok){
      this.navCtrl.navigateRoot('/home');
    }
  }

  checkpass(){
    if(this.newuser.pass1 == this.newuser.pass2){
      this.dbutton = false;
    }

  }

  ingresar(){
    this.slide.slideTo(0);
  }

  registro(){
    this.slide.slideTo(1);
  }
}
