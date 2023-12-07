import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  login() {
    this.router.navigateByUrl('/sign-in');
  }

  register() {
    this.router.navigateByUrl('/sign-up');
  }

  logout() {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/sign-in');
  }
  showNotifications() {}
}
