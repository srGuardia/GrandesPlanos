import { Component, OnInit } from "@angular/core";
import { PopoverController, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Global } from "src/app/global";
import { GoogleProvider } from "src/app/providers/google";

@Component({
  selector: "app-link-user",
  templateUrl: "./link-user.page.html",
  styleUrls: ["./link-user.page.scss"],
})
export class LinkUserPage implements OnInit {
  private listLinks: any[] = [];
  private userData: any = {};
  private display: string = "none";

  constructor(
    private googleProvider: GoogleProvider,
    public popoverCtrl: PopoverController,
    private storage: Storage,
    private global: Global,
    private toastCtrl: ToastController
  ) {}

  async refreshLinksUsers() {
    this.storage.get("formActive").then((resp) => {
      if (resp == null) {
        this.presentToast(
          "",
          "Escolha um formulário como principal",
          "warning"
        );
      } else {
        this.display = "block";
        this.googleProvider.load(resp._refSheet).then((dados: any) => {
          const obj: any = dados.feed;
          this.listLinks = obj.entry;
        });
      }
    });
  }

  async presentToast(header: string, message: string, color: string) {
    const toast = await this.toastCtrl.create({
      header: header,
      message: message,
      color: color,
      duration: 2 * 1000,
    });

    toast.present();
  }

  async searchNames(event) {
    let names = event.target.value;

    if (names) {
      if (names.length >= 3) {
        let arrayFilter = [];

        arrayFilter = this.listLinks.filter(
          (item) =>
            item.gsx$nome.$t.slice(0, 3).toLowerCase() == names.toLowerCase()
        );

        if (arrayFilter.length > 0) {
          this.listLinks = [...arrayFilter];
        }
      } else {
        await this.refreshLinksUsers();
      }
    }
  }

  ionViewWillEnter() {
    this.refreshLinksUsers();
  }

  ngOnInit() {}

  select(obj: any) {
    this.popoverCtrl.dismiss(obj);
  }
}
