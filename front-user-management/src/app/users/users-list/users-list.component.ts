import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../../services/user.service';
import { PageResponse } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule, UserDetailComponent, RouterLink]
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
}