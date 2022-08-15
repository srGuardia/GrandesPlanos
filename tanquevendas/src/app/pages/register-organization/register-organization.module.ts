import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterOrganizationPageRoutingModule } from './register-organization-routing.module';

import { RegisterOrganizationPage } from './register-organization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterOrganizationPageRoutingModule,
  ],
  declarations: [RegisterOrganizationPage],
})
export class RegisterOrganizationPageModule {}
