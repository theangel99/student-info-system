import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadComponent: () => import('./components/students-overview/students-overview.component').then(m => m.StudentsOverviewComponent)
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];
