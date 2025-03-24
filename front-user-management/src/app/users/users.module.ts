import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersListComponent,
    AddUserComponent,
    UserDetailComponent
  ],
  exports: [
    UsersListComponent,
    AddUserComponent,
    EditUserComponent,
    UserDetailComponent
  ]
})
export class UsersModule { }