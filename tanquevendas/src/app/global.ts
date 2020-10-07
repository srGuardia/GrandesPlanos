import { Injectable } from '@angular/core'

@Injectable()
export class Global {
    public tituloHeader = "Home";
    public showHeader = true
    public appPages = [{
        title: 'Home',
        url: 'home',
        icon: 'home',
        display: true,
        showHeader: false
    }, {
        title: 'Usuários',
        url: 'users',
        icon: 'body-outline',
        display: true,
        showHeader: false
    }, {
        title: 'Organizações',
        url: 'organizacao',
        icon: 'business-outline',
        display: true,
        showHeader: false
    },
    ]
}