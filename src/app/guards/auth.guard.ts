import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/index';
import { map, of, catchError } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser()) {
    console.warn('Acceso denegado: Sin sesión activa');
    router.navigate(['/auth/login']);
    return false;
  }

  return authService.renew().pipe(
    map((isValid) => {
      if (isValid) return true;

      router.navigate(['/auth/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    }),
  );
};
