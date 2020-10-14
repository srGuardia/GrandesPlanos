import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinksUsersPageRoutingModule } from './links-users-routing.module';

import { LinksUsersPage } from './links-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinksUsersPageRoutingModule
  ],
  declarations: [LinksUsersPage]
})
export class LinksUsersPageModule {}
