import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { EnvironmentComponent } from './shared/home/environment/environment.component';
import { TodoListComponent } from './shared/home/todoList/todoList.component';
import { ScannerEnvironmentComponent } from './shared/home/scannerEnvironment/scannerEnvironment.component';
import { validateAuthGuard } from './core/services/validateAuthGuard.guard';
import { deleteCurrentUserGuard } from './shared/utility/services/deleteCurrentUser.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    {
        path: "root", component: EnvironmentComponent,
        // canActivate: [validateAuthGuard],   // disabled for prototype — no login required
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: TodoListComponent },
            { path: 'userMasters', loadChildren: () => import("./feature/userMasters/userMasters.module").then(x => x.UserMastersModule) },
            { path: 'sample', loadChildren: () => import("./feature/sample/sample.module").then(x => x.SampleModule) },
        ]
    },
    {
        path: 'scanRoot', component: ScannerEnvironmentComponent,
        children: [
            { path: '', redirectTo: 'scanAuth', pathMatch: 'full' },
        ]
    },
];
