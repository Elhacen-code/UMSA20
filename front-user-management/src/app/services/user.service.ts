import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Role } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  assignRole(userId: number, roleId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/${userId}/roles/${roleId}`, {});
  }

  removeRole(userId: number, roleId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${userId}/roles/${roleId}`);
  }
}