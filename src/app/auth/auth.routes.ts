import { Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@auth/login-page').then((m) => m.LoginPageComponent),
      },
      {
        path: 'new-account',
        loadComponent: () =>
          import('@auth/register-page').then((m) => m.RegisterPageComponent),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
