import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy, OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);

  destroy$ = new Subject<void>();

  isUsernameFilled = false;
  isEmailFilled = false;
  isPasswordFilled = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(10)]],
    username: ['', [Validators.required, Validators.min(5)]],
  });

  ngOnInit(): void {
    this.form.get('email')?.valueChanges.subscribe((value) => {
      this.isEmailFilled = !!value;
    });
    this.form.get('password')?.valueChanges.subscribe((value) => {
      this.isPasswordFilled = !!value;
    });
    this.form.get('username')?.valueChanges.subscribe((value) => {
      this.isUsernameFilled = !!value;
    });
    /**
     * обмен данными через подписку
     */
    // this.authService.userChange
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((response) => {
    //     console.log('authServiceResponse', response);
    //   });
  }
  onSubmit() {
    const user = this.form.getRawValue();
    this.userService
      .registerUser(user)
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
        this.router.navigateByUrl('/sign-in');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
