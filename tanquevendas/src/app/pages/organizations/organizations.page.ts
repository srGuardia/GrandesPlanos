import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Global } from 'src/app/global';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})
export class OrganizationsPage implements OnInit {
  private listOrganization: any[] = [];
  private target = "organization";
  public filteredRows: any[] = [];

  constructor(private navCtrl: NavController, private dao: DefaultDAO, private global: Global) {
  }

  goPage(pagina, id) {
    if (id != null) pagina += "/" + id;
    this.navCtrl.navigateForward(pagina, { animated: true });
  }

  async refreshUserList() {
    this.listOrganization = [];
    await this.dao.listAll(this.target).subscribe(value => {
      value.forEach(result => {
        let object = result.data();
        this.listOrganization.push(object);
      });
    });

  }

  async search(event) {
    this.listOrganization.map((item) => {
      if (item._corporateName.includes(event.data)) {
        return item;
      }
      this.filteredRows.push(item);
    });
  }

  ionViewWillEnter() {
    this.refreshUserList();
  }

  ngOnInit() {
  }

}
