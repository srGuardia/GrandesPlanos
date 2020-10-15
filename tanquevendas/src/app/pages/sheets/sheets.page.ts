import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Global } from "src/app/global";
import { DefaultDAO } from "src/dao/defaultDAO";

@Component({
  selector: "app-sheets",
  templateUrl: "./sheets.page.html",
  styleUrls: ["./sheets.page.scss"],
})
export class SheetsPage implements OnInit {
  private listForms: any[] = [];
  private target: string = "sheets";

  private userData: any = {};

  private checked: Boolean = false;

  constructor(
    private global: Global,
    private dao: DefaultDAO,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  validStatus(uid) {
    debugger;
    this.storage.get("formActive").then((dados) => {
      if (dados._id == uid) {
        this.checked = true;
      } else {
        this.storage.remove("formActive");
      }
    });
  }

  selectForm(obj: any) {
    this.storage.set("formActive", obj);

    let message = obj._nameSheet;
    
    this.presentToast("", `Formulário ${message} selecionado como principal`, "success");
  }

  resetLogin() {
    this.storage.clear();
    this.navCtrl.navigateBack("login");
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

  goPage(pagina, id) {
    if (id != null) pagina += "/" + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  editForms(item) {
    this.goPage("/pages/register-sheet", item._id);
  }

  async onSearchChange(event) {
    let value = event.target.value;

    if (!value) {
      await this.refreshForms();
    } else {
      if (value.length >= 3) {
        let arrayFilter = [];

        arrayFilter = this.listForms.filter(
          (item) =>
            item._nameSheet.slice(0, 3).toLowerCase() == value.toLowerCase()
        );

        if (arrayFilter.length > 0) {
          this.listForms = [...arrayFilter];
        }
      }
    }
  }

  async refreshForms() {
    this.listForms = [];
    await this.dao.listAll(this.target).subscribe((dados) => {
      dados.forEach((result) => {
        let object = result.data();
        this.listForms.push(object);
      });
    });
  }

  ionViewWillEnter() {
    this.refreshForms();
  }

  async ngOnInit() {
    await this.storage.get("userData").then((dados) => {
      if (dados != null) {
        this.userData.id = dados._id;
        this.userData.name = dados._name;
        this.userData.adm = dados._adm;

        // if (this.userData.adm) {
        //   this.global.appPages[2].display = false;
        // } else {
        //   this.global.appPages[0].display = false;
        //   this.global.appPages[1].display = false;
        //   this.global.appPages[3].display = false;
        // }
      }
    });
  }
}
