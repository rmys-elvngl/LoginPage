import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './auth-guard.service';
// import { authGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: 'user',
    loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
    canActivate: [AuthGuardService],
  }, // Kullanıcı giriş yapmalı
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./sidenav/sidenav.component').then((m) => m.SidenavComponent),
    canActivate: [AuthGuardService],
  }, // Kullanıcı giriş yapmalı
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
