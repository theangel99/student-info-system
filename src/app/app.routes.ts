import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'overview',
    loadComponent: () => import('./components/students-overview/students-overview.component').then(m => m.StudentsOverviewComponent)
  },
  {
    path: 'students/:id',
    loadComponent: () => import('./components/student-details/student-details.component').then(m => m.StudentDetailsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
