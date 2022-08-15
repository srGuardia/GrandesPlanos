import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterOrganizationPage } from './register-organization.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterOrganizationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterOrganizationPageRoutingModule {}
