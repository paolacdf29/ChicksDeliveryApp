import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CartFabComponent } from './cart-fab/cart-fab.component';
import { HeaderComponent } from './header/header.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
//import { PopDetailsComponent } from './pop-details/pop-details.component';


@NgModule({
  declarations: [
    CartFabComponent,
    HeaderComponent,
    UsermenuComponent,
    //PopDetailsComponent
  ],
  exports: [
    CartFabComponent,
    HeaderComponent,
    UsermenuComponent,
    //PopDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
