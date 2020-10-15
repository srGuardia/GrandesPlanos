import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { Global } from "src/app/global";
import { DefaultDAO } from "src/dao/defaultDAO";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"],
})
export class UsersPage implements OnInit {
  public userList: any[] = [];
  public filteredRows: any[] = [];
  public userData: any = {};

  private target = "user";

  constructor(
    public dao: DefaultDAO,
    public translate: TranslateService,
    private navCtrl: NavController,
    private global: Global,
    private storage: Storage
  ) {}

  goPage(pagina, id) {
    if (id != null) pagina += "/" + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  async refreshUserList() {
    this.userList = [];
    await this.dao.listAll(this.target).subscribe((value) => {
      value.forEach((result) => {
        let object = result.data();
        this.userList.push(object);
      });
    });
  }

  editRegister(item) {
    this.goPage("/pages/register-user", item._id);
  }

  async search(event) {
    let value = event.target.value;
    if (!value) {
      this.refreshUserList();
    } else {
      let array = [];
      array = this.userList.filter(
        (item) => item._name.slice(0, 3).toLowerCase() == value.toLowerCase()
      );

      if (array.length > 0) {
        this.userList = [...array];
      }
    }
  }

  resetLogin() {
    this.storage.clear();
    this.navCtrl.navigateBack("login");
  }

  ionViewWillEnter() {
    this.refreshUserList();
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
        // }
      }
    });
  }
}
