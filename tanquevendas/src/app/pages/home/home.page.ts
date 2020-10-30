import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, PopoverController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Global } from "src/app/global";
import { Organization } from "src/app/model/organization";
import { User } from "src/app/model/user";
import { DefaultDAO } from "src/dao/defaultDAO";
import { LinkUserPage } from "../link-user/link-user.page";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public userData: any = {};
  public organizationData: any = {};
  private linkAlter: String;
  private sheetData: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private dao: DefaultDAO,
    private storage: Storage,
    private global: Global,
    private navCtrl: NavController,
    private popCtrl: PopoverController
  ) {}

  resetLogin() {
    this.storage.clear();
    this.navCtrl.navigateBack("login");
  }

  clickLinks() {
    this.presentPopoverLinks();
  }

  async presentPopoverLinks() {
    const popLinks = this.popCtrl.create({
      component: LinkUserPage,
      cssClass: "popover-edt",
      mode: "md",
    });
    (await popLinks).onDidDismiss().then((resp: any) => {
      if (!resp) return;
      if (!resp.data) return;

      const link = resp.data;
      if (link) {
        this.linkAlter = link.gsx$link.$t;

        window.open(`${this.linkAlter}`);
      }
    });
    return (await popLinks).present();
  }

  async ngOnInit() {
    await this.storage.get("userData").then((dados) => {
      if (dados != null) {
        this.userData.id = dados._id;
        this.userData.adm = dados._adm;
        this.userData.name = dados._name;
        this.userData.email = dados._email;
        this.userData.link = dados._link;
        this.organizationData = dados._organization;
      }
    });
  }
}
