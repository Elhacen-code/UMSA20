import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UserDetailComponent {
  @Input() user: User | null = null;
}
