import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterSheetPage } from './register-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterSheetPageRoutingModule {}
