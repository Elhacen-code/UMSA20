import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../../services/user.service';

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

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }


  sortUsers(column: keyof User): void {
    this.users.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
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