import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-custom-role-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-role-dialog.component.html',
  styleUrls: ['./custom-role-dialog.component.scss']
})

export class CustomRoleDialogComponent  implements OnInit{
  user: User | null = null;
  roles: Role[] = [];
  @Output() closeDialog = new EventEmitter<void>();
  @Output() assignRole = new EventEmitter<number>();

  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      roleId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      }
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).className === 'dialog-overlay') {
      this.close();
    }
  }

  close(): void {
    this.closeDialog.emit();
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.assignRole.emit(this.roleForm.value.roleId);
    }
  }
}