import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    public authService: AuthService,
    public storage: Storage,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('pt-br');
    this.translate.use('pt-br');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('userData').then((userData) => {
        if (!userData) {
          this.navCtrl.navigateRoot('/login');
          this.storage.clear();
        } else {
          if (userData._adm) {
            this.navCtrl.navigateForward('/pages/users');
          } else {
            this.navCtrl.navigateForward('/pages/home');
          }
        }
      });
    });
  }
}
