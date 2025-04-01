import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-custom-role-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog-overlay" (click)="onOverlayClick($event)">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2>Assign Role to User</h2>
          <button class="close-button" (click)="close()">×</button>
        </div>
        <div class="dialog-content">
          <form [formGroup]="roleForm">
            <div class="form-group">
              <label>User</label>
              <input type="text" [value]="user?.username" readonly class="form-control">
            </div>
            <div class="form-group">
              <label>Role</label>
              <select formControlName="roleId" class="form-control">
                <option value="">Select a role</option>
                <option *ngFor="let role of roles" [value]="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="dialog-actions">
          <button class="btn-secondary" (click)="close()">Cancel</button>
          <button class="btn-primary" [disabled]="!roleForm.valid" (click)="onSubmit()">Assign</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .dialog-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      width: 100%;
      max-width: 400px;
      padding: 0;
      animation: slideIn 0.3s ease-out;
    }

    .dialog-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #50617e;
      color: white;
      border-radius: 12px 12px 0 0;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      color: white;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 1;
    }

    .dialog-content {
      padding: 24px;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #50617e;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #e0e4e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      background: #f8f9fa;
    }

    .form-control:focus {
      outline: none;
      border-color: #50617e;
      box-shadow: 0 0 0 3px rgba(80, 97, 126, 0.15);
      background: white;
    }

    .dialog-actions {
      padding: 20px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-primary, .btn-secondary {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #50617e, #3c4a61);
      color: white;
      font-weight: 500;
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #3c4a61, #2e3748);
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background-color: #f0f2f5;
      color: #50617e;
      font-weight: 500;
    }

    .btn-secondary:hover {
      background-color: #e4e7eb;
    }
  `]
})
export class CustomRoleDialogComponent {
  @Input() user: User | null = null;
  @Input() roles: any[] = [];
  @Output() closeDialog = new EventEmitter<void>();
  @Output() assignRole = new EventEmitter<number>();

  roleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      roleId: ['', Validators.required]
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