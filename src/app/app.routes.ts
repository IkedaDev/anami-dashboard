import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('@layouts/auth-layout/auth-layout').then((c) => c.AuthLayout),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('@pages/auth/login-page/login-page').then((c) => c.LoginPage),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('@layouts/dashboard-layout/dashboard-layout').then((c) => c.DashboardLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/dashboard/home-page/home-page').then((c) => c.HomePage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
