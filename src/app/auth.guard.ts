import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Route } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const userLogged = localStorage.getItem('user');
  if (userLogged) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
