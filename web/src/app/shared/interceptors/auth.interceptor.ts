import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const auth = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });
  return next(auth);
};
