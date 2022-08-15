import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSheetPageRoutingModule } from './register-sheet-routing.module';

import { RegisterSheetPage } from './register-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterSheetPageRoutingModule,
  ],
  declarations: [RegisterSheetPage],
})
export class RegisterSheetPageModule {}
