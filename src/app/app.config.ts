import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './core/intercepters/request.interceptor';
import { loggingInterceptor } from './core/intercepters/logging.interceptor';
import { authInterceptor } from './core/intercepters/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        requestInterceptor,
        loggingInterceptor,
        authInterceptor,
      ])
    ),
  ],
};
