import { Component, OnInit } from "@angular/core";
import { Global } from "src/app/global";
import { TranslateService } from "@ngx-translate/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  private userData: any = {};

  constructor(
    public global: Global,
    public translate: TranslateService,
    public storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.get("userData").then((dados) => {
      if (dados != null) {
        this.userData.id = dados._id;
        this.userData.name = dados._name;
        this.userData.adm = dados._adm;

        if (this.userData.adm) {
          this.global.appPages[0].display = true;
          this.global.appPages[1].display = true;
          this.global.appPages[3].display = true;
          this.global.appPages[2].display = false;
        } else {
          this.global.appPages[0].display = false;
          this.global.appPages[1].display = false;
          this.global.appPages[3].display = false;
          this.global.appPages[2].display = true;
        }
      }
    });
  }
}
