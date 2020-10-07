import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  private target = "organization";

  constructor(public dao: DefaultDAO, public translate: TranslateService) {

  }

  async refreshUserList() {
    this.userList = [];
    await this.dao.listAll(this.target).subscribe(value => {
      console.log('users', value)
      value.forEach(result => {
        let object = result.data();
        this.userList.push(object);
      });
    });

  }

  ionViewWillEnter() {
    this.refreshUserList();
  }

  ngOnInit() {
  }

}
