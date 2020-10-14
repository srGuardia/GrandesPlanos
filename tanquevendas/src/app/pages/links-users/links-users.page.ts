import { Component, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll, PopoverController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Global } from "src/app/global";
import { GoogleProvider } from "src/app/providers/google";

@Component({
  selector: "app-links-users",
  templateUrl: "./links-users.page.html",
  styleUrls: ["./links-users.page.scss"],
})
export class LinksUsersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private listinks: any[] = [];
  private userData: any = {};

  constructor(
    private googleProvider: GoogleProvider,
    public popoverCtrl: PopoverController,
    private storage: Storage,
    private global: Global
  ) {}

  async refreshLinksUsers() {
    await this.googleProvider.load().then((dados: any) => {
      const obj: any = dados.feed;
      this.listinks = obj.entry;
    });
  }

  async searchNames(event) {
    let names = event.target.value;

    if (names) {
      if (names.length >= 3) {
        let arrayFilter = [];

        arrayFilter = this.listinks.filter(
          (item) =>
            item.gsx$nome.$t.slice(0, 3).toLowerCase() == names.toLowerCase()
        );

        if (arrayFilter.length > 0) {
          this.listinks = [...arrayFilter];
        }
      } else {
        await this.refreshLinksUsers();
      }
    }
  }

  async ngOnInit() {
    await this.refreshLinksUsers();

    await this.storage.get("userData").then((dados) => {
      if (dados != null) {
        this.userData.id = dados._id;
        this.userData.name = dados._name;
        this.userData.adm = dados._adm;

        if (this.userData.adm) {
          this.global.appPages[2].display = false;
        } else {
          this.global.appPages[0].display = false;
          this.global.appPages[1].display = false;
        }
      }
    });
  }

  select(obj: any) {
    this.popoverCtrl.dismiss(obj);
  }
}
