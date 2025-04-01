import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'users', 
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'users/add', 
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];