import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../../services/user.service';
import { PageResponse } from '../../services/user.service';
import { CustomRoleDialogComponent } from '../custom-role-dialog/custom-role-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule, UserDetailComponent, RouterLink, CustomRoleDialogComponent]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  selectedUser: User | null = null;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  showRoleDialog = false;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Manager' }
  ];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<User>) => {
        this.users = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  sortUsers(column: keyof User): void {
    if (column === 'username' || column === 'email') {
      this.users.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        
        if (valueA === undefined && valueB === undefined) return 0;
        if (valueA === undefined) return 1;
        if (valueB === undefined) return -1;
        
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      });
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  toggleUserAccount(id: number): void {
    this.userService.toggleUserAccount(id).pipe(
      tap(() => {
        const user = this.users.find(u => u.id === id);
        if (user) {
          user.enabled = !user.enabled;
        }
      }),
      catchError((err) => {
        this.error = 'Failed to toggle user account';
        console.error('Error toggling user account:', err);
        throw err;
      })
    ).subscribe();
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        if (this.users.length === 0 && this.currentPage > 0) {
          this.currentPage--;
          this.loadUsers();
        }
      },
      error: (err) => {
        this.error = 'Failed to delete user';
        console.error('Error deleting user:', err);
      }
    });
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  addRoleToUser(): void {
    if (!this.selectedUser) {
      alert('Please select a user first');
      return;
    }
    this.showRoleDialog = true;
  }

  onCloseDialog(): void {
    this.showRoleDialog = false;
  }

  onAssignRole(roleId: number): void {
    if (this.selectedUser) {
      this.userService.assignRole(this.selectedUser.id, roleId).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
            this.selectedUser = updatedUser;
          }
          this.showRoleDialog = false;
        },
        error: (err) => {
          console.error('Error adding role:', err);
          alert('Failed to add role to user');
        }
      });
    }
  }
}