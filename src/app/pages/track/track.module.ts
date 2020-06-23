import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackPageRoutingModule } from './track-routing.module';

import { TrackPage } from './track.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrackPage]
})
export class TrackPageModule {}
