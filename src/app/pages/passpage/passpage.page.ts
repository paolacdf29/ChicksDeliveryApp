import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-passpage',
  templateUrl: './passpage.page.html',
  styleUrls: ['./passpage.page.scss'],
})
export class PasspagePage implements OnInit {

  passwords = {
    current: "",
    new: "",
  }

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  changePass(form: NgForm){
    if(form.valid){
      this.sessionService.changepass(this.passwords);
    }

  }

}
