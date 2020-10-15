import { Injectable } from '@angular/core'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class Global {
    private storage: Storage;
    private navCtrl: NavController;
    private user: any = {};

    public tituloHeader = "Home";
    public showHeader = false;
    public appPages = [
        {
            title: 'Usuários',
            url: 'users',
            icon: 'body-outline',
            display: true,
            showHeader: false
        },
        {
            title: 'Organizações',
            url: 'organizations',
            icon: 'business-outline',
            display: true,
            showHeader: false
        },
        {
            title: 'Home',
            url: 'home',
            icon: 'home-outline',
            display: true,
            showHeader: false
        },
        {
            title: 'Formulários',
            url: 'sheets',
            icon: 'clipboard-outline',
            display: true,
            showHeader: false
        },
    ];
}