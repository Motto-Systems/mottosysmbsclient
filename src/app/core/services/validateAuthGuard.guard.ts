import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CommonMethods } from '../../shared/utility/commonMethods';
import { PageUrls } from '../../shared/login/login.model';

export const validateAuthGuard: CanActivateFn = (_, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const context = sessionStorage.getItem('MSPL_CONTEXT');
  const isLoggedIn = CommonMethods.hasValue(context);

  // If logged in → allow
  if (isLoggedIn) {
    return true;
  }

  // If not logged in and trying to access a protected page → redirect
  if (state.url !== PageUrls.login) {
    router.navigate([PageUrls.login]);
    return false;
  }

  // Not logged in but on login page → allow
  return true;
};
