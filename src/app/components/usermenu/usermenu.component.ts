import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss'],
})
export class UsermenuComponent implements OnInit {

  logged: boolean;

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.islogged();
  }

  plsLogOut(){
    this.sessionService.logOut();
  }

}
