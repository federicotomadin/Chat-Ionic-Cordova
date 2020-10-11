import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesBPage } from './opciones-b.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesBPageRoutingModule {}
