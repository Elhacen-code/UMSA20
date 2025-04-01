import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  roles: Role[] = [];
  roleForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.error = null;
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
        console.log('Roles loaded successfully:', roles);
      },
      error: (error) => {
        this.error = 'Error loading roles. Please try again.';
        this.loading = false;
        console.error('Error loading roles:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const newRole: Role = this.roleForm.value;
      this.loading = true;
      this.error = null;
      this.roleService.addRole(newRole).subscribe({
        next: () => {
          this.roleForm.reset();
          this.loadRoles();
        },
        error: (error) => {
          this.error = 'Error creating role. Please try again.';
          this.loading = false;
          console.error('Error creating role:', error);
        }
      });
    }
  }

  editRole(role: Role): void {
    // Implement edit functionality
    console.log('Edit role:', role);
  }

  deleteRole(role: Role): void {
    if (confirm(`Are you sure you want to delete the role: ${role.name}?`)) {
      this.loading = true;
      this.error = null;
      this.roleService.deleteRole(role.id).subscribe({
        next: () => {
          this.loadRoles();
        },
        error: (error) => {
          this.error = 'Error deleting role. Please try again.';
          this.loading = false;
          console.error('Error deleting role:', error);
        }
      });
    }
  }
}