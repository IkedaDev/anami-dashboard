import { Routes } from '@angular/router';
import { authGuard, publicGuard } from '@guards/index';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('@layouts/auth-layout/auth-layout').then((c) => c.AuthLayout),
    canActivate: [publicGuard],
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
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/dashboard/home-page/home-page').then((c) => c.HomePage),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('@pages/dashboard/appointments-page/appointments-page').then(
            (c) => c.AppointmentsPage,
          ),
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('@pages/dashboard/clients-page/clients-page').then((c) => c.ClientsPage),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('@pages/dashboard/services-page/services-page').then((c) => c.ServicesPage),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('@pages/dashboard/reports-page/reports-page').then((c) => c.ReportsPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
