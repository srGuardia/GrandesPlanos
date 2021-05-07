import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  public listOrganization: any[] = [];
  private target = 'organization';
  public userData: any = {};
  private loading: any;

  constructor(
    private navCtrl: NavController,
    private dao: DefaultDAO,
    private global: Global,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {}

  goPage(pagina, id) {
    if (id != null) pagina += '/' + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async refreshOrganizationList() {
    this.listOrganization = [];
    await this.dao.listAll(this.target).then((value) => {
      value.forEach((result) => {
        const object = result.data();
        this.listOrganization.push(object);
      });
      this.loading.dismiss();
    });
  }

  async search(event) {
    let value = event.target.value;
    if (!value) {
      this.refreshOrganizationList();
    } else {
      let array = [];
      array = this.listOrganization.filter(
        (item) =>
          item._corporateName.slice(0, 3).toLowerCase() == value.toLowerCase()
      );

      if (array.length > 0) {
        this.listOrganization = [...array];
      }
    }
  }

  editRegister(item) {
    this.goPage('/pages/register-organization', item._id);
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.refreshOrganizationList();
  }

  resetLogin() {
    this.storage.clear();
    this.navCtrl.navigateBack('login');
  }

  async ngOnInit() {
    await this.storage.get('userData').then((dados) => {
      if (dados != null) {
        this.userData.id = dados._id;
        this.userData.name = dados._name ? dados._name : 'Administrador';
        this.userData.adm = dados._adm;
      }
    });
  }
}
