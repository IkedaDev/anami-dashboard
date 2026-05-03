import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/index';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si hay un usuario logueado en nuestro Signal
  if (authService.currentUser()) {
    return true;
  }

  console.warn('Acceso denegado: Usuario no autenticado');
  router.navigate(['/auth/login']);
  return false;
};
