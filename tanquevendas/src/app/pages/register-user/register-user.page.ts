import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { DefaultDAO } from 'src/dao/defaultDAO';
import * as firebase from 'firebase';
import { User } from 'src/app/model/user';
import { Organization } from 'src/app/model/organization';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { LinkUserPage } from '../link-user/link-user.page';
import { Sheet } from 'src/app/model/sheet';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  public userData: any = {};
  public organizationData: any = {};
  public sheetData: any = {};
  public organizationList = [];
  public sheetsList = [];
  private target = 'organization';
  private targetUser = 'user';
  private targetSheets = 'sheets';
  private organizationSelect: any = {};
  private sheetSelect: any = {};
  private uidUser: string = null;
  private selectedUser: User = null;
  private linkAlter: String = null;
  private loading: any;

  constructor(
    private dao: DefaultDAO,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private popCtrl: PopoverController,
    private loadingCtrl: LoadingController
  ) {}

  async refreshOrganization() {
    this.organizationList = [];
    await this.dao.listAll(this.target).then((value) => {
      value.forEach((result) => {
        let object = result.data();
        this.organizationList.push(object);
      });
    });
  }

  async refreshSheets() {
    this.sheetsList = [];
    await this.dao.listAll(this.targetSheets).then((value) => {
      value.forEach((result) => {
        let object = result.data();
        this.sheetsList.push(object);
      });
    });
  }

  onSave() {
    if (
      this.userData.name == null ||
      this.userData.password == null ||
      this.userData.email == null ||
      this.organizationData.id == null ||
      this.sheetData.id == null
    ) {
      this.presentToast('Validação', 'Campos obrigatórios', 'warning');
    } else {
      this.organizationSelect = this.organizationList.filter(
        (item) => item._id === this.organizationData.id
      );

      this.sheetSelect = this.sheetsList.filter(
        (item) => item._id === this.sheetData.id
      );

      if (this.selectedUser != null) {
        this.updateUser();
      } else {
        this.createUser(this.userData.email, this.userData.password);
      }
    }
  }

  async updateUser() {
    try {
      let newUser = new User();
      let newOrganization = new Organization();
      let newSheet = new Sheet();

      newUser.id = this.selectedUser.id;
      newUser.name = this.userData.name;
      newUser.email = this.userData.email;
      newUser.password = this.userData.password;
      newUser.link = this.linkAlter;

      if (this.selectedUser.adm) {
        newUser.adm = true;
      } else {
        newUser.adm = false;
      }

      newOrganization.id = this.organizationSelect[0]._id;
      newOrganization.corporateName = this.organizationSelect[0]._corporateName;
      newOrganization.linkRegister = this.organizationSelect[0]._linkRegister;
      newOrganization.linkForecast = this.organizationSelect[0]._linkForecast;
      newOrganization.linkSales = this.organizationSelect[0]._linkSales;
      newOrganization.active = this.organizationSelect[0]._active;
      newOrganization.firstActionName =
        this.organizationSelect[0]._firstActionName;
      newOrganization.firstActionLink =
        this.organizationSelect[0]._firstActionLink;
      newOrganization.secondActionName =
        this.organizationSelect[0]._secondActionName;
      newOrganization.secondActionLink =
        this.organizationSelect[0]._secondActionLink;

      newSheet.id = this.sheetSelect[0]._id;
      newSheet.nameSheet = this.sheetSelect[0]._nameSheet;
      newSheet.description = this.sheetSelect[0]._description;
      newSheet.colorSheet = this.sheetSelect[0]._colorSheet;
      newSheet.refSheet = this.sheetSelect[0]._refSheet;

      newUser.organization = Object.assign({}, newOrganization);
      newUser.sheet = Object.assign({}, newSheet);

      await this.dao
        .updateByReference(this.targetUser, this.selectedUser.id, newUser)
        .then(() => {
          this.presentToast('Sucesso', 'Usuário atualizado!', 'success');
        });
    } catch (error) {
      this.presentToast('Erro', error.message, 'danger');
    }
  }

  async createUser(email: any, password: any) {
    this.uidUser = null;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
          this.uidUser = resp.user.uid;
        });
    } catch (error) {
      this.presentToast('Erro', error.message, 'danger');
    }

    this.saveCollectionUser(this.uidUser);
  }

  async saveCollectionUser(uid) {
    try {
      let newUser = new User();
      let newOrganization = new Organization();
      let newSheet = new Sheet();

      newUser.id = uid;
      newUser.name = this.userData.name;
      newUser.email = this.userData.email;
      newUser.password = this.userData.password;
      newUser.adm = false;
      newUser.link = this.linkAlter;

      newOrganization.id = this.organizationSelect[0]._id;
      newOrganization.corporateName = this.organizationSelect[0]._corporateName;
      newOrganization.linkRegister = this.organizationSelect[0]._linkRegister;
      newOrganization.linkForecast = this.organizationSelect[0]._linkForecast;
      newOrganization.linkSales = this.organizationSelect[0]._linkSales;
      newOrganization.active = this.organizationSelect[0]._active;
      newOrganization.firstActionName =
        this.organizationSelect[0]._firstActionName;
      newOrganization.firstActionLink =
        this.organizationSelect[0]._firstActionLink;
      newOrganization.secondActionName =
        this.organizationSelect[0]._secondActionName;
      newOrganization.secondActionLink =
        this.organizationSelect[0]._secondActionLink;

      newSheet.id = this.sheetSelect[0]._id;
      newSheet.nameSheet = this.sheetSelect[0]._nameSheet;
      newSheet.description = this.sheetSelect[0]._description;
      newSheet.colorSheet = this.sheetSelect[0]._colorSheet;
      newSheet.refSheet = this.sheetSelect[0]._refSheet;

      newUser.organization = Object.assign({}, newOrganization);
      newUser.sheet = Object.assign({}, newSheet);

      this.dao.addNew(this.targetUser, newUser).then((dados) => {
        this.presentToast('Sucesso', 'Usuário registrado!', 'success');
        this.clearForm();
      });
    } catch (error) {
      this.presentToast('Erro', error.message, 'danger');
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
    this.navCtrl.navigateBack('/pages/users');
    this.clearForm();
  }

  clearForm() {
    this.userData = {};
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async ionViewWillEnter() {
    this.presentLoading();
    await this.refreshOrganization();
    await this.refreshSheets();
    this.ngOnInit();
    this.loading.dismiss();
  }

  clickLinks() {
    this.presentPopoverLinks();
  }

  async presentPopoverLinks() {
    const popLinks = this.popCtrl.create({
      component: LinkUserPage,
      cssClass: 'popover-edt',
      mode: 'md',
    });
    (await popLinks).onDidDismiss().then((resp: any) => {
      if (!resp) return;
      if (!resp.data) return;

      const link = resp.data;
      if (link) this.linkAlter = link.gsx$link.$t;
    });
    return (await popLinks).present();
  }

  async ngOnInit() {
    this.uidUser = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.uidUser != null) {
      //Carrega as informações do usuário com base no ID do parâmetro
      await this.dao
        .findByReference(this.targetUser, this.uidUser)
        .subscribe((value) => {
          this.selectedUser = Object.assign(new User(), value.data());

          let newOrganization = new Organization();
          let newSheet = new Sheet();

          if (this.selectedUser != null) {
            this.userData.name = this.selectedUser.name;
            this.userData.email = this.selectedUser.email;
            this.userData.password = this.selectedUser.password;
            this.linkAlter = this.selectedUser.link;

            newOrganization = Object.assign(
              new Organization(),
              this.selectedUser.organization
            );

            newSheet = Object.assign(new Sheet(), this.selectedUser.sheet);

            this.organizationData.id = newOrganization.id;
            this.organizationData.corporateName = newOrganization.corporateName;

            this.sheetData.id = newSheet.id;
            this.sheetData.nameSheet = newSheet.nameSheet;
          }
        });
    }
  }
}
