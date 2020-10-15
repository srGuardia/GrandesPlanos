import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkUserPageRoutingModule } from './link-user-routing.module';

import { LinkUserPage } from './link-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkUserPageRoutingModule
  ],
  declarations: [LinkUserPage]
})
export class LinkUserPageModule {}
