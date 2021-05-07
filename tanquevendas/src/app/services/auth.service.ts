import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private checkLoop = null;
  private checkInterval = 1;

  constructor(public afAuth: AngularFireAuth) {}

  login(user): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getAuth() {
    return this.afAuth.auth;
  }

  getUser(): User {
    return this.afAuth.auth.currentUser;
  }

  checkCredentials() {
    if (this.checkLoop != null) {
      clearTimeout(this.checkLoop);
      this.checkLoop = null;
    }
    //Checkin Credentials

    this.checkLoop = setTimeout(() => {
      this.checkCredentials();
    }, this.checkInterval * 1000);
  }
}
