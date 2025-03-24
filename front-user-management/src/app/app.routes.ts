import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];