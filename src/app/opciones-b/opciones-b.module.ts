import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesBPageRoutingModule } from './opciones-b-routing.module';

import { OpcionesBPage } from './opciones-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesBPageRoutingModule
  ],
  declarations: [OpcionesBPage]
})
export class OpcionesBPageModule {}
