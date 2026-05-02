import { Component, AfterContentInit, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Application, ModuleSubModule } from './environment.model';
import { MasterService } from '../../../core/services/master.service';
import { CommonServiceUrls } from '../../utility/commonServiceUrls';
import { AppContextService } from '../../../core/context/appContext.service';
import { environment } from '../../../../environments/environment';
import { PageUrls } from '../../login/login.model';
import { EnvironmentCommonLogic } from './environment.commonLogic';
import { FormInfoBO } from '../../../core/context/contextModel';

@Component({
    selector: 'env',
    templateUrl: './environment.html',
    styleUrls: ['./environment.scss'],
    standalone: false,
})
export class EnvironmentComponent extends EnvironmentCommonLogic implements AfterContentInit, OnDestroy {

    appCode = signal<string>('');
    allExpanded = false;
    applications: Application[] = [];

    subscription$ = new Subscription();

    constructor(public _router: Router, private _service: MasterService, public _context: AppContextService) {
        super();
        this.appCode.set(environment.appCode);
    }

    ngAfterContentInit() {
        this.subscription$.add(this._service.subject$.subscribe(resp => {
            this.doAfterViewInit(resp);
        }));

        this.initialLoad();
    }

    initialLoad() {
        this.getMenuList();
        this.getAllApplications();
    }

    doAfterViewInit(resp: any) {
        switch (resp.purpose) {
            case 'getMenuList':
                this.handleGetMenuListResponse(resp.result ?? []);
                this.getAllModules();
                break;
            case 'applications':
                this.prepareApplicationData(resp.result);
                break;
            case 'GetAllModules':
                this.handleGetAllModulesResponse(resp.result);
                break;
        }
    }

    getMenuList() {
       this.loading.set(true);
        this._service.getApiService(CommonServiceUrls.getMenuList, [this.appCode()], 'getMenuList', environment.workFlowApiUrl);
    }

    getAllApplications() {
        this._service.getApiService(CommonServiceUrls.getApplication, [this._context.appContext.userDetails.loginID], 'applications', environment.usmApiUrl);
    }

    getAllModules() {
        this._service.getApiService(CommonServiceUrls.GetAllModules, [environment.appCode], "GetAllModules", environment.workFlowApiUrl);
    }

    handleGetMenuListResponse(result: any) {
        this.loading.set(false);
        const data = result.map((x: any) => ({ ...x, expanded: false }));
        this.moduleSubModuleList.set(data);
    }

    handleGetAllModulesResponse(result: any) {
        this._context.appContext.moduleList = result.length > 0 ? result : this.moduleSubModuleList();
        this._context.appContext.formsList = this._context.appContext.moduleList.flatMap(x => x.formsInfo);
        this._context.setSession();
        this.setCustomPageTitle();
    }

    expandAll() {
        this.allExpanded = !this.allExpanded;
        this.moduleSubModuleList().forEach(x => x.expanded = this.allExpanded);
    }

    toggleSection(id: string) {
        this.activeGroup.set(this.activeGroup() === id ? null : id);
        this._context.currentGroup = id;

        if (id === 'ToDo') {
            this.navigateHome();
        }
    }

    closeAllSidenavs() {
        this.activeGroup.set(null);
    }

    navigateHome() {
        this._router.navigateByUrl(PageUrls.homePage);
        this.closeAllSidenavs();
    }

    navigateParent(item: ModuleSubModule, sub: FormInfoBO) {
        this.setCustomPageTitle();
        this._context.currentGroup = item.moduleGroup;
        sessionStorage.setItem('moduleCode', sub.moduleCode || item.moduleCode);
        sessionStorage.setItem('formsId', String(sub.formsID ?? 0));
        this.closeAllSidenavs();
        this._router.navigate(['/root']).then(() => this._router.navigateByUrl(sub.formRoute ?? PageUrls.homePage));
    }

    prepareApplicationData(result: any) {
        if (result && result.data) {
            this.applications = result.data.map((a: any) => ({
                applicationCode: a.itemID,
                applicationName: a.item,
                applicationUrl: a.itemCode,
                imagePath: `assets/img/${a.itemID.toLowerCase()}_m_icon.svg`
            }));
        }
    }

    onSidenavToggle(isOpen: boolean) {
        const backdrops = document.querySelectorAll('.mat-drawer-backdrop');
        backdrops.forEach((b: any) => {
            b.style.visibility = isOpen ? 'visible' : 'hidden';
            b.style.opacity = isOpen ? '1' : '0';
        });
    }

    setCustomPageTitle() {
        setTimeout(() => {
            this._context.setModuleList(this.moduleSubModuleList());
        }, 10);
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
