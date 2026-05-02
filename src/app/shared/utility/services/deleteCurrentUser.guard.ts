import { inject } from '@angular/core';
import { CanDeactivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MasterService } from '../../../core/services/master.service';
import { CommonServiceUrls } from '../commonServiceUrls';
import { environment } from '../../../../environments/environment';
import { Observable, of, take } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export const deleteCurrentUserGuard: CanDeactivateFn<any> = (
  component: any,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
): Observable<boolean> | boolean => {
  
  
  const masterService = inject(MasterService);
  
  // Get basicInfoID from route query params (bid)
  const basicInfoID = currentRoute.queryParams['bid'];
  
  // If no basicInfoID, allow navigation
  if (!basicInfoID) {
    return true;
  }

  // Call the DeleteCurrentUser API
  masterService.getApiService(
    CommonServiceUrls.DeleteCurrentUser,
    [basicInfoID],
    "DeleteCurrentUser",
    environment.baseUrl
  );

  // Subscribe to the response and allow navigation after API call completes
  return masterService.subject$.pipe(
    filter(resp => resp.purpose === "DeleteCurrentUser"),
    take(1),
    map(() => {
      // Always return true to allow navigation after API call
      return true;
    })
  );
};
