import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DefaultDAO } from 'src/dao/defaultDAO';
import * as firebase from 'firebase';
import { User } from 'src/app/model/user';
import { Organization } from 'src/app/model/organization';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  private userData: any = {};
  private organizationData: any = {};
  private organizationList = [];
  private target = 'organization';
  private targetUser = 'user';
  private organizationSelect: any = {};

  constructor(private dao: DefaultDAO, private navCtrl: NavController, private toastCtrl: ToastController) { }

  async refreshOrganization() {
    this.organizationList = [];
    await this.dao.listAll(this.target).subscribe(value => {
      value.forEach(result => {
        let object = result.data();
        this.organizationList.push(object);
      });
    });

  }

  onSave() {
    if (this.userData.name == null || this.userData.password == null || this.userData.email == null || this.organizationData.id == null) {
      this.presentToast("Validação", "Campos obrigatórios", "warning");
    }
    else {
      this.organizationSelect = this.organizationList.filter(item => item._id === this.organizationData.id);
      this.createUser(this.userData.email, this.userData.password);
    }
  }

  async createUser(email: any, password: any) {
    let uidUser = null;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password).then((resp) => {
        uidUser = resp.user.uid;
      });

    } catch (error) {
      console.log('aqui', error)
      this.presentToast("Erro", error.message, "danger");
    }

    this.saveCollectionUser(uidUser);
  }

  async saveCollectionUser(uid) {
    try {
      let newUser = new User();
      let newOrganization = new Organization();

      newUser.id = uid;
      newUser.name = this.userData.name;
      newUser.email = this.userData.email;
      newUser.password = this.userData.password;
      newUser.adm = false;

      newOrganization.id = this.organizationSelect[0]._id;
      newOrganization.corporateName = this.organizationSelect[0]._corporateName;
      newOrganization.linkRegister = this.organizationSelect[0]._linkRegister;
      newOrganization.linkChange = this.organizationSelect[0]._linkChange;
      newOrganization.linkForecast = this.organizationSelect[0]._linkForecast;
      newOrganization.linkSales = this.organizationSelect[0]._linkSales;

      newUser.organization = Object.assign({}, newOrganization);

      this.dao.addNew(this.targetUser, newUser).then((dados) => {
        this.presentToast("Sucesso", "Usuário registrado!", "success");
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
    this.navCtrl.navigateBack("/pages/users");
  }

  clearForm() {
    this.userData = {};
  }


  ionViewWillEnter() {
    this.refreshOrganization();
  }

  ngOnInit() {
  }

}
