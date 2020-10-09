import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Global } from 'src/app/global';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public userList: any[] = [];
  public filteredRows: any[] = [];
  public userData: any = null;

  private target = "user";
  private rows: any[] = [];

  constructor(public dao: DefaultDAO, public translate: TranslateService, private navCtrl: NavController, private global: Global) {
    this.global.appPages.map(page => console.log('page', page))

    console.log('window', window)
  }

  goPage(pagina, id) {
    if (id != null) pagina += "/" + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  async refreshUserList() {
    this.userList = [];
    await this.dao.listAll(this.target).subscribe(value => {
      value.forEach(result => {
        let object = result.data();
        this.userList.push(object);
      });
    });

  }

  async search(event) {
    let value = event.target.value;
    if (!value) {
      this.refreshUserList()
    }
    else {
      let array = [];
      array = this.userList.filter(item => item._name.slice(0, 3).toLowerCase() == value.toLowerCase());

      if (array.length > 0) {
        this.userList = [...array]
      }
    }
  }

  ionViewWillEnter() {
    this.refreshUserList();
  }

  ngOnInit() {
  }

}
