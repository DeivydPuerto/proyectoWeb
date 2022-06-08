import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';

import { AuthGuard } from './core/guards/auth.guard';
import { CustomerGuard } from './core/guards/customer.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'professions',
    loadChildren: () => import('./modules/professions/professions.module').then(m => m.ProfessionsModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'consultants',
    loadChildren: () => import('./modules/consultants/consultants.module').then(m => m.UsersModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'task',
    loadChildren: () => import('./modules/tasks/task.module').then(m => m.TaskModule),
    canActivate: [CustomerGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'about',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
