import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RolesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: RolesListComponent }
    ])
  ]
})
export class RolesModule { }