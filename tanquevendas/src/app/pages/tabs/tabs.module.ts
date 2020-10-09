import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: 'pages',
  component: TabsPage,
  children: [
    {
      path: 'users',
      loadChildren: () => import('../users/users.module').then(m => m.UsersPageModule)
    },
    {
      path: 'organizations',
      loadChildren: () => import('../organizations/organizations.module').then(m => m.OrganizationsPageModule)
    },
    {
      path: 'register-user',
      loadChildren: () => import('../register-user/register-user.module').then(m => m.RegisterUserPageModule)
    },
    {
      path: 'register-user/:id',
      loadChildren: () => import('../register-user/register-user.module').then(m => m.RegisterUserPageModule)
    },
    {
      path: 'register-organization',
      loadChildren: () => import('../register-organization/register-organization.module').then(m => m.RegisterOrganizationPageModule)
    },
    {
      path: 'register-organization/:id',
      loadChildren: () => import('../register-organization/register-organization.module').then(m => m.RegisterOrganizationPageModule)
    },
  ]
}]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
