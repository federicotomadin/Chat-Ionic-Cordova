import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesPage } from './opciones.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesPageRoutingModule {}
