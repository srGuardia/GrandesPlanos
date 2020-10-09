import { Injectable } from '@angular/core'

@Injectable()
export class Global {
    public tituloHeader = "Home";
    public showHeader = true;
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
        }
    ];
}