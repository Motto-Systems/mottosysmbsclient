import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppContextService } from '../context/appContext.service';
import { InternetAlertComponent } from '../../internet-alert/internet-alert.component';
import { CommonMethods } from '../../shared/utility/commonMethods';
import { ButtonBehaviorService } from './buttonBehavior';
import { LoaderService } from './loader.service';
import { environment } from '../../../environments/environment';
import { MockService } from './mock.service';


@Injectable()

export class AppHttpInterceptor implements HttpInterceptor {

  networkStatus$: Subscription = Subscription.EMPTY;
  previousStatus: boolean = navigator.onLine;
  private connectionLostModal!: MatDialogRef<InternetAlertComponent>;
  private connectedModal!: MatDialogRef<InternetAlertComponent>;

  constructor(private router: Router, private _matDialog: MatDialog, private context: AppContextService,
    private _router: Router, private buttonBehaviorService: ButtonBehaviorService,
    private _loader: LoaderService, private _mockService: MockService) {
    this.checkNetworkStatus();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { buttonId, loaderId } = this.buttonBehaviorService.getButtonAndLoaderIds();

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.context.appContext.msplToken}`)
    });

    if (environment.useMockApi && this._mockService.isAllowMockApi(request)) {
      const mockResponse = this._mockService.getMockRespose();
      if (mockResponse) {
        return mockResponse.pipe(
          tap(() => this.toggleButtonAndSpinner(buttonId, loaderId, false)),
          finalize(() => this.toggleButtonAndSpinner(buttonId, loaderId, true))
        );
      }
    }


    return next.handle(request).pipe(
      tap(() => {
        this.toggleButtonAndSpinner(buttonId, loaderId, false);
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleAuthError(error);
      }),
      finalize(() => {
        this.toggleButtonAndSpinner(buttonId, loaderId, true)
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (this._matDialog.openDialogs.length > 0) {

      let idx = this._matDialog.openDialogs.length - 1;
      if (idx == 0)
        this._matDialog.openDialogs[idx].close();
      else {
        for (let index = idx; index <= idx; index--) {
          this._matDialog.openDialogs[index].close();
        }
      }

    }

    if (err.status === 401 || err.status === 400) {
      return of(err.message);
    }

    return new Observable();
  }

  checkNetworkStatus() {
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        if (status !== this.previousStatus) {
          this.previousStatus = status;

          if (!status) {
            this.connectionLostModal = this._matDialog.open(InternetAlertComponent, CommonMethods.modalPopupWidth('50'));
            this.connectionLostModal.componentInstance.internetStatus = status;
          } else {
            if (this.connectionLostModal) {
              this.connectionLostModal.close();
            }
            this.connectedModal = this._matDialog.open(InternetAlertComponent, CommonMethods.modalPopupWidth('50'));
            this.connectedModal.componentInstance.internetStatus = status;

            setTimeout(() => {
              this._router.navigateByUrl("");
              if (this.connectedModal) {
                this.connectedModal.close();
              }
            }, 3000);
          }

        }
      });
  }

  private toggleButtonAndSpinner(buttonId: string, loaderId: string, isEnabled: boolean) {
    if (isEnabled)
      this._loader.hide();
    else
      this._loader.show();

    if (buttonId) {
      const buttonElement: any = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.disabled = !isEnabled;
      }
    }
    if (loaderId) {
      const spinnerElement: any = document.getElementById(loaderId);
      if (spinnerElement) {
        spinnerElement.style.display = isEnabled ? 'none' : 'block';
      }
    }

    const faIconElement = document.getElementById(buttonId?.replace('btn-', 'faIcon-'));
    const buttonTextElement = document.getElementById(buttonId?.replace('btn-', 'buttonText-'));

    if (faIconElement) {
      faIconElement.style.display = isEnabled ? 'inline' : 'none';
    }

    //for button text 'Processing...'
    if (buttonTextElement) {
      // const buttonText = isEnabled ? this.buttonBehaviorService.getButtonText().text : 'Processing...';
      // buttonTextElement.textContent = buttonText;
    }

  }

}