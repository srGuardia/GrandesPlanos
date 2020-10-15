import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TabsPageRoutingModule } from "./tabs-routing.module";

import { TabsPage } from "./tabs.page";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
  {
    path: "pages",
    component: TabsPage,
    children: [
      {
        path: "users",
        loadChildren: () =>
          import("../users/users.module").then((m) => m.UsersPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "organizations",
        loadChildren: () =>
          import("../organizations/organizations.module").then(
            (m) => m.OrganizationsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then((m) => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "register-user",
        loadChildren: () =>
          import("../register-user/register-user.module").then(
            (m) => m.RegisterUserPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "register-user/:id",
        loadChildren: () =>
          import("../register-user/register-user.module").then(
            (m) => m.RegisterUserPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "register-organization",
        loadChildren: () =>
          import("../register-organization/register-organization.module").then(
            (m) => m.RegisterOrganizationPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "register-organization/:id",
        loadChildren: () =>
          import("../register-organization/register-organization.module").then(
            (m) => m.RegisterOrganizationPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "link-user",
        loadChildren: () =>
          import("../link-user/link-user.module").then(
            (m) => m.LinkUserPageModule
          ),
      },
      {
        path: "sheets",
        loadChildren: () =>
          import("../sheets/sheets.module").then((m) => m.SheetsPageModule),
      },
      {
        path: "register-sheet",
        loadChildren: () =>
          import("../register-sheet/register-sheet.module").then(
            (m) => m.RegisterSheetPageModule
          ),
      },
      {
        path: "register-sheet/:id",
        loadChildren: () =>
          import("../register-sheet/register-sheet.module").then(
            (m) => m.RegisterSheetPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
