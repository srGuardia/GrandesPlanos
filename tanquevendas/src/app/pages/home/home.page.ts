import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { Organization } from 'src/app/model/organization';
import { User } from 'src/app/model/user';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private userData: any = {};
  private organizationData: any = {};

  constructor(private activatedRoute: ActivatedRoute, private dao: DefaultDAO, private storage: Storage, private global: Global, private navCtrl: NavController) {

    this.storage.get('userData').then((dados) => {
      if (dados != null) {

        this.userData.id = dados._id;
        this.userData.adm = dados._adm;
        this.userData.name = dados._name;
        this.userData.email = dados._email;
        this.organizationData = dados._organization;

        if (this.userData.adm) {
          this.global.appPages[2].display = false;
        } else {
          this.global.appPages[0].display = false;
          this.global.appPages[1].display = false;
        }
      }
    });
  }

  resetLogin() {
    this.storage.clear();
    this.navCtrl.navigateBack('login');
  }

  ngOnInit() {

  }

}
