import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracionInicial(){
    this.oneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
    // do something when notification is received
    console.log('notificacion recibida', noti)
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('notificacion abierta', noti)
    });

    this.oneSignal.endInit();
  }
}
