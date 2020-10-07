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
  children: [{
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
  }, {
    path: 'users',
    loadChildren: () => import('../users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'organizacao',
    loadChildren: () => import('../organizacao/organizacao.module').then(m => m.OrganizacaoPageModule)
  }]
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
