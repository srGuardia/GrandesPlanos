import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Organization } from 'src/app/model/organization';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.page.html',
  styleUrls: ['./register-organization.page.scss'],
})
export class RegisterOrganizationPage implements OnInit {
  private organizationData: any = {};
  private target = 'organization';

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private dao: DefaultDAO) { }

  onSave() {
    if (this.organizationData.corporateName == null) {
      this.presentToast("Validação", "Campos obrigatórios", "warning");
    }
    else {
      this.saveCollectionOrganization();
    }
  }

  async saveCollectionOrganization() {
    try {
      let newOrganization = new Organization();

      newOrganization.corporateName = this.organizationData.corporateName;
      newOrganization.linkRegister = this.organizationData.linkRegister;
      newOrganization.linkChange = this.organizationData.linkChange;
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
    const toast = await this.toastCtrl.create({ header: header, message: message, color: color, duration: 2 * 1000 });

    toast.present();
  }

  returnPage() {
    this.navCtrl.navigateBack("/pages/organizations");
    this.clearForm();
  }

  clearForm() {
    this.organizationData = {}
  }

  ngOnInit() {
  }

}
