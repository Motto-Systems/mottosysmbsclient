import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppHttpInterceptor } from './core/services/httpIntercepter.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppContextService } from './core/context/appContext.service';
import { ValidationExecutionService } from './core/services/validationExecution.service';
import { MasterService } from './core/services/master.service';
import { AppHttpService } from './core/services/http.service';
import { AlertService } from './core/services/alert.service';
import { AppPaginationService } from './shared/globalShared/appPagination/appPagination.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ConfirmationService } from './core/services/confirmationService';
import { ButtonBehaviorService } from './core/services/buttonBehavior';
import { provideStore } from '@ngrx/store';
import { MockService } from './core/services/mock.service';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    MasterService,
    AppHttpService,
    AlertService,
    ValidationExecutionService,
    CurrencyPipe,
    DatePipe,
    AppPaginationService,
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideStore(),
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    AppContextService,
    ButtonBehaviorService,
    ConfirmationService,
    MockService,
    provideNativeDateAdapter()
  ]
};
