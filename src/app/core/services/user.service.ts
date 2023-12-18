import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  UserAuthenticateInterface,
  UserInterface,
  UserRegisterInterface,
} from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  registerUser(
    user: UserRegisterInterface
  ): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>('api/users', { user });
  }

  authenticateUser(
    user: UserAuthenticateInterface
  ): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>('api/users/login', { user });
  }

  getUser(): Observable<{ user: UserInterface }> {
    return this.http.get<{ user: UserInterface }>('api/user');
  }
}
