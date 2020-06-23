import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { user } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users: user[] = []; //usuario
  edit: boolean = false; //verdadero cuando el usuario selecciona editar
  update = {
    tlf: 0,
    direc: ''
  }//info a editar
  
  constructor(public sessionService: SessionService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.users = this.sessionService.getUser();
    this.update.tlf = this.users[0].Telefono_client;
    this.update.direc = this.users[0].direccion_client;
  }

  
  
  async presentToast(msj: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      position: 'middle',
      duration: 1000
    });
    toast.present();
  }

  //activa la opcion de editar los datos
  enableEdit(){
    this.edit = !this.edit;
  }

  //envia los nuevos datos del usuario 
  async onSubmitTemplate(form: NgForm){
    if(form.valid){
      const ok = await this.sessionService.updateuser(this.update);
      if(ok){
        this.edit = false;
        this.presentToast('Your settings have been saved.');
      }else{
        this.presentToast("Sorry, please try again.");
      }
    }else{
      this.presentToast('please check your info and try again');
    }

  }
}
