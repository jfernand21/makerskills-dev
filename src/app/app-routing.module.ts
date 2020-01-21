import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['profile'] } },
  { path: 'login', component: LoginComponent },
  { path: 'restricted', component: RestrictedComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['profile'] } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //TODO falta agregar roles
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
