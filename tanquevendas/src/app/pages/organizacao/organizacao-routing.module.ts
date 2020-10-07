import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizacaoPage } from './organizacao.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizacaoPageRoutingModule {}
