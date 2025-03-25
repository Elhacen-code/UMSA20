import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;

  constructor(
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    // TODO: Fetch user data and populate form
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        role: user.roles
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userId,
        ...this.userForm.value
      };
      // TODO: Update user
      this.userService.updateUser(updatedUser.id,updatedUser).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}