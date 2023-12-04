import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  UserAuthenticateInterface,
  UserInterface,
  UserRegisterInterface,
} from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  registerUser(user: UserRegisterInterface) {
    return this.http.post<{ user: UserInterface }>('api/users', { user });
  }

  authenticateUser(user: UserAuthenticateInterface) {
    return this.http.post<{ user: UserInterface }>('api/users/login', { user });
  }

  getUser() {
    return this.http.get<{ user: UserInterface }>('api/user');
  }
}
