import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController, NavParams } from "@ionic/angular";
import { User } from "src/app/model/user";
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  private userLogin: any = {};
  public userData: User;
  public usuarioLogado = false;
  public userID: any = null;
  public loading: any;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    // private storage: Storage
  ) { }

  async validateUser() {
    this.usuarioLogado = false;

    if (this.userLogin.email == null || this.userLogin.password == null || this.userLogin.email == "" || this.userLogin.password == "") {
      this.presentToast("Validação", "Campos obrigatórios", "warning");
    }
    else {
      await firebase.auth().signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password).then(({ user }) => {
        this.usuarioLogado = true;
        this.userID = user.uid;
        this.presentToast("Sucesso", "Usuário logado", "success");
      }, error => {
        this.presentToast("Erro", error.message, "danger");
      })

      if (!this.usuarioLogado) return;
      else {
        this.login();
      }
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin).then((credential: firebase.auth.UserCredential) => {
        // this.storage.set('user', this.userLogin);
        this.navCtrl.navigateForward('home');
      }, error => {
        this.presentToast("Erro", error.message, "danger");
      })
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: "Por favor, aguarde..." });
    return this.loading.present();
  }

  async presentToast(header: string, message: string, color: string) {
    const toast = await this.toastCtrl.create({ header: header, message: message, color: color, duration: 3 * 1000 });

    toast.present();
  }

  ngOnInit() { }
}
