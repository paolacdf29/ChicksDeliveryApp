import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss'],
})
export class UsermenuComponent implements OnInit {


  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    
  }

  plsLogOut(){
    this.sessionService.logOut();
  }

}
