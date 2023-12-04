import { HttpInterceptorFn } from '@angular/common/http';

const BASE_URL = 'https://api.realworld.io/';
export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    url: BASE_URL + req.url,
  });
  return next(newRequest);
};
