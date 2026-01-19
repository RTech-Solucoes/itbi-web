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
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/private/dashboard/dashboard').then(m => m.DashboardComponent)
            },
            {
                path: 'home',
                loadComponent: () => import('./pages/private/home/home').then(m => m.HomeComponent)
            },
            {
                path: 'imoveis/declarar-transmissao',
                loadComponent: () => import('./pages/private/imoveis/transmissao/transmissao-form/transmissao-form').then(m => m.TransmissaoForm)
            },
            {
                path: 'configuracoes/valores-abertura-pat',
                loadComponent: () => import('./pages/private/configuracoes/valores-abertura-pat/valores-abertura-pat').then(m => m.ValoresAberturaPat)
            }
        ]
    }
];
