import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class UserDetailComponent {
  @Input() user: User | null = null;

  isAdmin(): boolean {
    return this.user?.roles.some(role => role.name === 'Admin') || false;
  }
}
