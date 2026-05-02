import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CommonMethods } from "../../utility/commonMethods";
import { AppContextService } from "../../../core/context/appContext.service";
import { MasterService } from "../../../core/services/master.service";
import { CommonServiceUrls } from "../../utility/commonServiceUrls";
import { IToDoCountBO, TodoItems } from "./todoListModel";
import { GLOBAL_CONSTANTS } from "../../utility/constant";
import { environment } from "../../../../environments/environment";
import { CustomLoaderService } from "../../../core/services/customLoaderService";
import { TodoListLogic } from "./todoList.commonLogic";
import { AlertService } from "../../../core/services/alert.service";

@Component({
    selector: 'todo',
    templateUrl: './todoList.html',
    styleUrl: './todoList.scss',
    standalone: false,
})

export class TodoListComponent extends TodoListLogic implements AfterViewInit, OnDestroy {

    todoListMenuFilter: any = [];
    subscription$: Subscription = new Subscription();
    docID: any;
    currentUser: string = "";

    constructor(private _router: Router, private _context: AppContextService,
        private _service: MasterService, private _loader: CustomLoaderService, private _alert: AlertService) {
        super();
        this._context.pageHeaderInfo.showPageHeader = false;
        this._context.currentGroup = "ToDo";
    }

    ngAfterViewInit() {
        this.subscription$ = this._service.subject$.subscribe(resp => {
            this.doAfterViewInit(resp);
        });
        this.initialLoad();
    }

    initialLoad() {
        this.bindData();
        sessionStorage.removeItem("moduleCode");
    }

    doAfterViewInit(resp: any) {
        switch (resp.purpose) {
            case 'toDOListCount':
                this.handleToDoListResponse(resp?.result ?? []);
                break;
            case 'getToDoListItemsByID':
                this.handleTodoListByIDResponse(resp?.result);
                break;
        }
    }

    handleToDoListResponse(result: any[]) {
        this._loader.hide();
       // this.totalToDoList.set(result);
    }

    handleTodoListByIDResponse(data: any) {
        let obj = this.totalList().find(objData => objData.formID == this.formID());

        if (!obj) {
            var item: TodoItems = new TodoItems();
            item.formID = this.formID();
            item.items = data;
            item.conditionalData = data;
            this.totalList.update(list => [...list, item]);
        }
    }

    bindData() {
      //  this._loader.show('ToDo List Loading...');
      //  this._service.getApiService(CommonServiceUrls.toDOListCount, [], "toDOListCount");
    }

    getTodoList(item: IToDoCountBO, index: number) {
        this.searchTitle.set(`Search ${item.formTitle}`);

        this.formID.set(item.formId);
        var obj = this.totalList().find(objData => objData.formID == this.formID());

        if (obj) {
            this.getFilterTodoItems();
            return;
        }

        this._service.getApiService(CommonServiceUrls.getRequestBasicInfoByFormID, [String(this.formID()), environment.appCode], "getToDoListItemsByID");
    }

    onActionClicked(evt: any) {
  
        this._service.getApiService(CommonServiceUrls.CheckAndSetCurrentUser, [evt.basicInfoId], "CheckAndSetCurrentUser", environment.baseUrl);
        
        const checkUserSub = this._service.subject$.subscribe(resp => {
            if(resp.purpose == "CheckAndSetCurrentUser"){
                this.currentUser = resp.result.responseCode;

                if(this.currentUser != "SUCCESS"){
                    this._alert.warning(this.currentUser);
                    checkUserSub.unsubscribe();
                    return;
                }
                else{
                    sessionStorage.setItem(GLOBAL_CONSTANTS.MODULE_CODE, evt.moduleCode);
                    sessionStorage.setItem(GLOBAL_CONSTANTS.FORMS_ID, evt.formId);

                    const routeUrl = this._context.getFormDataByKey(evt.formId, 'formsID', 'formRoute');
                    this._router.navigate([routeUrl], { queryParams: { id: evt?.submissionID ?? '', bid: evt?.basicInfoId, formID: evt?.formId }, onSameUrlNavigation: 'reload' });
                    checkUserSub.unsubscribe();
                }
            }
        });


        // sessionStorage.setItem(GLOBAL_CONSTANTS.MODULE_CODE, evt.moduleCode);
        // sessionStorage.setItem(GLOBAL_CONSTANTS.FORMS_ID, evt.formId);

        // const routeUrl = this._context.getFormDataByKey(evt.formId, 'formsID', 'formRoute');
        // this._router.navigate([routeUrl], { queryParams: { id: evt?.submissionID ?? '', bid: evt?.basicInfoId, formID: evt?.formId }, onSameUrlNavigation: 'reload' });
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
        this._context.pageHeaderInfo.showPageHeader = true;

        if (CommonMethods.hasValue(this.docID))
            this.docID.className = "mat-card";
    }

}