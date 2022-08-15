import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Sheet } from 'src/app/model/sheet';
import { DefaultDAO } from 'src/dao/defaultDAO';

@Component({
  selector: 'app-register-sheet',
  templateUrl: './register-sheet.page.html',
  styleUrls: ['./register-sheet.page.scss'],
})
export class RegisterSheetPage implements OnInit {
  private uidSheet = null;
  private selectSheet: Sheet = null;
  private target: string = 'sheets';
  public sheetData: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private dao: DefaultDAO,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  onSave() {
    if (
      this.sheetData.nameSheet == null ||
      this.sheetData.colorSheet == null ||
      this.sheetData.refSheet == null
    ) {
      this.presentToast('Validação', 'Campos obrigatórios', 'warning');
    } else {
      if (this.selectSheet == null) {
        this.createCollectionSheet();
      } else {
        this.updateSheet(this.uidSheet);
      }
    }
  }

  async presentToast(header: string, message: string, color: string) {
    const toast = await this.toastCtrl.create({
      header: header,
      message: message,
      color: color,
      duration: 2 * 1000,
    });

    toast.present();
  }

  async createCollectionSheet() {
    try {
      let newSheet = new Sheet();

      newSheet.nameSheet = this.sheetData.nameSheet;
      newSheet.description = this.sheetData.description;
      newSheet.colorSheet = this.sheetData.colorSheet;
      newSheet.refSheet = this.sheetData.refSheet;

      this.dao.addNew(this.target, newSheet).then(() => {
        this.presentToast('Sucesso', 'Formulário registrado!', 'success');
        this.clearForm();
      });
    } catch (error) {
      this.presentToast('Erro', error.message, 'danger');
    }
  }

  clearForm() {
    this.sheetData = {};
  }

  returnPage() {
    this.navCtrl.navigateBack('/pages/sheets');
    this.clearForm();
  }

  async updateSheet(uid) {
    try {
      let newSheet = new Sheet();

      newSheet.id = uid;
      newSheet.nameSheet = this.sheetData.nameSheet;
      newSheet.description = this.sheetData.description;
      newSheet.colorSheet = this.sheetData.colorSheet;
      newSheet.refSheet = this.sheetData.refSheet;

      await this.dao
        .updateByReference(this.target, this.selectSheet.id, newSheet)
        .then(() => {
          this.presentToast('Sucesso', 'Formulário atualizado!', 'success');
        });
    } catch (error) {
      this.presentToast('Erro', error.message, 'danger');
    }
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.uidSheet = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.uidSheet != null) {
      //Carrega as informações do usuário com base no ID do parâmetro
      await this.dao
        .findByReference(this.target, this.uidSheet)
        .subscribe((value) => {
          this.selectSheet = Object.assign(new Sheet(), value.data());

          if (this.selectSheet != null) {
            this.sheetData.nameSheet = this.selectSheet.nameSheet;
            this.sheetData.description = this.selectSheet.description;
            this.sheetData.colorSheet = this.selectSheet.colorSheet;
            this.sheetData.refSheet = this.selectSheet.refSheet;
          }
        });
    }
  }
}
