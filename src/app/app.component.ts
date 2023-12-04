import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { UserService } from './core/services/user.service';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.authService.currentUserSig.set(res.user);
        },
        error: () => {
          this.authService.currentUserSig.set(null);
        },
      });
  }
}
