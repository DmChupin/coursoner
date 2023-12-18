import { Routes } from '@angular/router';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { CourseListComponent } from './features/course-list/course-list.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { loginActivateGuard } from './core/guards/login-activate.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'courses',
    canActivate: [loginActivateGuard],
    component: CourseListComponent,
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'learning-chart',
    canActivate: [loginActivateGuard],
    loadComponent: () =>
      import('./features/learning-chart/learning-chart.component').then(
        (comp) => comp.LearningChartComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
