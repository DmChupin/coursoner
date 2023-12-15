import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { UserService } from './core/services/user.service';
import { Subject, catchError, finalize, takeUntil, throwError } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { LoaderComponent } from './features/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .pipe(
        catchError((err) => {
          this.authService.currentUserSig.set(null);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
