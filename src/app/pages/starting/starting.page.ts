import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-starting',
  templateUrl: './starting.page.html',
  styleUrls: ['./starting.page.scss'],
})
export class StartingPage implements OnInit {
  //Esta es solo una pagina que se asegura de cargar el usuario y los servicios
  constructor(private sessionService: SessionService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.sessionService.loadSession();
    setTimeout(() => {
      this.navCtrl.navigateRoot('/home');
      console.log('Session cargada');
    }, 2500);
  }

}
