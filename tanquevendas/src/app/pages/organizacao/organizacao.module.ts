import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizacaoPageRoutingModule } from './organizacao-routing.module';

import { OrganizacaoPage } from './organizacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizacaoPageRoutingModule
  ],
  declarations: [OrganizacaoPage]
})
export class OrganizacaoPageModule {}
