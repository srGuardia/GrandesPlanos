import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinksUsersPage } from './links-users.page';

const routes: Routes = [
  {
    path: '',
    component: LinksUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinksUsersPageRoutingModule {}
