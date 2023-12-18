import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const loginActivateGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (!tokenService.getToken()) {
    return router.navigate(['/sign-in']);
  }
  return true;
};
