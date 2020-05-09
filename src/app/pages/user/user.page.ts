import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { user } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users: user[];
  edit: boolean = false;
  update = {
    tlf: 0,
    direc: ''
  }
  
  constructor(public sessionService: SessionService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.users = this.sessionService.getUser();
    this.update.tlf = this.users[0].Telefono_client;
    this.update.direc = this.users[0].direccion_client;
  }

  enableEdit(){
    if(this.edit){
      this.edit = false;
    }else{
      this.edit = true;
    }
  }

  async presentToast(msj: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      position: 'middle',
      duration: 1000
    });
    toast.present();
  }

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
