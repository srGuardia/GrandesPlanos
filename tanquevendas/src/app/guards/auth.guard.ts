import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, private navCtrl: NavController, private storage: Storage
  ) { }

  canActivate(): Promise<boolean>{
    return new Promise(resolve => {
      this.storage.get('user').then(user => {
        if (!user) {
          this.navCtrl.navigateRoot('/login');
        }
        resolve(user ? true : false);
      }, error => {
      });
    });
  }
}
