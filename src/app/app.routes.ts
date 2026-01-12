import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/public/login/login').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/public/register/register').then(m => m.RegisterComponent)
    },
    {
        path: '',
        loadComponent: () => import('./layouts/private-layout/private-layout').then(m => m.PrivateLayout),
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./pages/private/home/home').then(m => m.HomeComponent)
            },
            {
                path: 'imoveis/declarar-transmissao',
                loadComponent: () => import('./pages/private/imoveis/transmissao/transmissao-form/transmissao-form').then(m => m.TransmissaoForm)
            }
        ]
    }
];
