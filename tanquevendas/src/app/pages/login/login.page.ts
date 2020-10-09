import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController, NavParams } from "@ionic/angular";
import { User } from "src/app/model/user";
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Global } from 'src/app/global';
import { DefaultDAO } from 'src/dao/defaultDAO';
import { ObjectFactory } from 'src/app/util/object-factory';

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
  private target = 'user';

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private global: Global,
    private dao: DefaultDAO,
    private objectFactory: ObjectFactory
  ) {
    this.global.showHeader = false;
  }

  getUserData() {
    this.dao.findByReference(this.target, this.userID).subscribe(res => {
      this.userData = this.objectFactory.deserialize(res.data(), new User());
      this.storage.set('userData', this.userData);
    });
  }

  async validateUser() {
    this.usuarioLogado = false;

    if (this.userLogin.email == null || this.userLogin.password == null || this.userLogin.email == "" || this.userLogin.password == "") {
      this.presentToast("Validação", "Campos obrigatórios", "warning");
    }
    else {
      await firebase.auth().signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password).then((res) => {
        this.usuarioLogado = true;
        this.userID = res.user.uid;
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
        this.storage.set('user', this.userLogin);
        this.getUserData();
        this.global.showHeader = true;
        this.navCtrl.navigateForward('/pages/users');
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
    const toast = await this.toastCtrl.create({ header: header, message: message, color: color, duration: 2 * 1000 });

    toast.present();
  }

  ngOnInit() { }
}
