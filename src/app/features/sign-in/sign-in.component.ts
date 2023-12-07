import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy, OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  destroy$ = new Subject<void>();

  isEmailFilled = false;
  isPasswordFilled = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(10)]],
  });

  ngOnInit(): void {
    this.form.get('email')?.valueChanges.subscribe((value) => {
      this.isEmailFilled = !!value;
    });
    this.form.get('password')?.valueChanges.subscribe((value) => {
      this.isPasswordFilled = !!value;
    });
  }
  onSubmit() {
    const user = this.form.getRawValue();
    this.userService
      .authenticateUser(user)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.user.token);
        //this.authService.changeUser(response.user);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/courses');
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
