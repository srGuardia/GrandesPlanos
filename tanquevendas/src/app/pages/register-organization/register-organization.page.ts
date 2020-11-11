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
  public organizationData: any = {};
  private target = "organization";
  private uidOrganization: string = null;
  private selectOrganization: Organization = null;

  public activeActions: Boolean = false;
  public requiredActions: Boolean = true;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private dao: DefaultDAO,
    private activatedRoute: ActivatedRoute
  ) {}

  onSave() {
    if (
      this.organizationData.corporateName == null ||
      (this.activeActions == true &&
        this.organizationData.firstActionName == null &&
        this.organizationData.firstActionLink == null) ||
      (this.organizationData.secondActionName == null &&
        this.organizationData.secondActionName == null)
    ) {
      this.presentToast("Validação", "Campo obrigatório", "warning");
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
      newOrganization.linkRegister = this.organizationData.linkRegister || "";
      newOrganization.linkForecast = this.organizationData.linkForecast || "";
      newOrganization.linkSales = this.organizationData.linkSales || "";

      if (this.activeActions) {
        newOrganization.active = this.organizationData.active;
        newOrganization.firstActionName = this.organizationData.firstActionName;
        newOrganization.firstActionLink = this.organizationData.firstActionLink;
        newOrganization.secondActionName = this.organizationData.secondActionName;
        newOrganization.secondActionLink = this.organizationData.secondActionLink;
      } else {
        newOrganization.active = false;
        newOrganization.firstActionName = "";
        newOrganization.firstActionLink = "";
        newOrganization.secondActionName = "";
        newOrganization.secondActionLink = "";
      }

      await this.dao
        .updateByReference(
          this.target,
          this.selectOrganization.id,
          newOrganization
        )
        .then(() => {
          this.presentToast("Sucesso", "Empresa atualizada!", "success");
          this.ngOnInit();
        });
    } catch (error) {
      this.presentToast("Erro", error.message, "danger");
    }
  }

  async saveCollectionOrganization() {
    try {
      let newOrganization = new Organization();

      newOrganization.corporateName = this.organizationData.corporateName;
      newOrganization.linkRegister = this.organizationData.linkRegister
        ? this.organizationData.linkRegister
        : "";
      newOrganization.linkForecast = this.organizationData.linkForecast
        ? this.organizationData.linkForecast
        : "";
      newOrganization.linkSales = this.organizationData.linkSales
        ? this.organizationData.linkSales
        : "";

      if (this.activeActions) {
        newOrganization.active = this.organizationData.active;
        newOrganization.firstActionName = this.organizationData.firstActionName;
        newOrganization.firstActionLink = this.organizationData.firstActionLink;
        newOrganization.secondActionName = this.organizationData.secondActionName;
        newOrganization.secondActionLink = this.organizationData.secondActionLink;
      } else {
        newOrganization.active = false;
        newOrganization.firstActionName = "";
        newOrganization.firstActionLink = "";
        newOrganization.secondActionName = "";
        newOrganization.secondActionLink = "";
      }

      this.dao.addNew(this.target, newOrganization).then(() => {
        this.presentToast("Sucesso", "Empresa registrada!", "success");
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

  handleActions(event) {
    let value = event.target.checked;
    this.activeActions = value;
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
            this.activeActions = this.selectOrganization.active;
            this.organizationData.corporateName = this.selectOrganization.corporateName;
            this.organizationData.linkForecast = this.selectOrganization.linkForecast;
            this.organizationData.linkRegister = this.selectOrganization.linkRegister;
            this.organizationData.linkSales = this.selectOrganization.linkSales;
            this.organizationData.active = this.selectOrganization.active;
            this.organizationData.firstActionName = this.selectOrganization.firstActionName;
            this.organizationData.firstActionLink = this.selectOrganization.firstActionLink;
            this.organizationData.secondActionName = this.selectOrganization.secondActionName;
            this.organizationData.secondActionLink = this.selectOrganization.secondActionLink;
          }
        });
    }
  }
}
