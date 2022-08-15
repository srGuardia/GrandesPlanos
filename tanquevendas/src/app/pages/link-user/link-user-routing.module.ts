import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkUserPage } from './link-user.page';

const routes: Routes = [
  {
    path: '',
    component: LinkUserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkUserPageRoutingModule {}
