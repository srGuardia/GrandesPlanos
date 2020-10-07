import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public global: Global, public translate: TranslateService) { }

  ngOnInit() {
  }

}
