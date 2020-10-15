import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { Organization } from "src/app/model/organization";
import { DefaultDAO } from "src/dao/defaultDAO";

@Component({
  selector: "app-register-organization",
  templateUrl: "./register-organization.page.html",
  styleUrls: ["./register-organization.page.scss"],
})
export class RegisterOrganizationPage implements OnInit {
  private organizationData: any = {};
  private target = "organization";
  private uidOrganization: string = null;
  private selectOrganization: Organization = null;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private dao: DefaultDAO,
    private activatedRoute: ActivatedRoute
  ) {}

  onSave() {
    if (this.organizationData.corporateName == null) {
      this.presentToast("Validação", "Campos obrigatórios", "warning");
    } else {
      if (this.selectOrganization != null) {
        this.updateOrganization();
      } else {
        this.saveCollectionOrganization();
      }
    }
  }

  async updateOrganization() {
    try {
      let newOrganization = new Organization();

      newOrganization.id = this.selectOrganization.id;
      newOrganization.corporateName = this.organizationData.corporateName;
      newOrganization.linkRegister = this.organizationData.linkRegister;
      // newOrganization.linkChange = this.organizationData.linkChange;
      newOrganization.linkForecast = this.organizationData.linkForecast;
      newOrganization.linkSales = this.organizationData.linkSales;

      await this.dao
        .updateByReference(
          this.target,
          this.selectOrganization.id,
          newOrganization
        )
        .then(() => {
          this.presentToast("Sucesso", "Organização atualizada!", "success");
        });
    } catch (error) {
      this.presentToast("Erro", error.message, "danger");
    }
  }

  async saveCollectionOrganization() {
    try {
      let newOrganization = new Organization();

      newOrganization.corporateName = this.organizationData.corporateName;
      newOrganization.linkRegister = this.organizationData.linkRegister;
      // newOrganization.linkChange = this.organizationData.linkChange;
      newOrganization.linkForecast = this.organizationData.linkForecast;
      newOrganization.linkSales = this.organizationData.linkSales;

      this.dao.addNew(this.target, newOrganization).then(() => {
        this.presentToast("Sucesso", "Organização registrada!", "success");
        this.clearForm();
      });
    } catch (error) {
      this.presentToast("Erro", error.message, "danger");
    }
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

  returnPage() {
    this.navCtrl.navigateBack("/pages/organizations");
    this.clearForm();
  }

  clearForm() {
    this.organizationData = {};
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.uidOrganization = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.uidOrganization != null) {
      //Carrega as informações do usuário com base no ID do parâmetro
      await this.dao
        .findByReference(this.target, this.uidOrganization)
        .subscribe((value) => {
          this.selectOrganization = Object.assign(
            new Organization(),
            value.data()
          );

          if (this.selectOrganization != null) {
            this.organizationData.corporateName = this.selectOrganization.corporateName;
            // this.organizationData.linkChange = this.selectOrganization.linkChange;
            this.organizationData.linkForecast = this.selectOrganization.linkForecast;
            this.organizationData.linkRegister = this.selectOrganization.linkRegister;
            this.organizationData.linkSales = this.selectOrganization.linkSales;
          }
        });
    }
  }
}
