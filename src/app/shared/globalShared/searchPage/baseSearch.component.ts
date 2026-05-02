import { Component, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ICustomDropdownNCheckListData } from "../customCheckList/customChecklistModel";
import { ActionBO } from "../appGrid/appGrid.model";
import { Subscription } from "rxjs";
import { GridPageActions } from "../../utility/gridPageActions";
import { CommonMethods } from "../../utility/commonMethods";
import { SearchFilterModalService } from "../advanceSearchChipList/service/searchFilterModelService.service";
import { ACTION_GET, Actions } from "../../utility/actions";

@Component({
    selector: 'base-search',
    template: '',
    standalone: false
})
export class BaseSearchComponent implements OnDestroy {
    headerData: Array<any> = [];
    dataSource: any;
    searchBy = "";
    searchResult: Array<any> = []
    statusList: Array<ICustomDropdownNCheckListData> = new Array<ICustomDropdownNCheckListData>();
    actions: Array<ActionBO> = [
        Actions.GetActionByCode(ACTION_GET.VIEW),
        Actions.GetActionByCode(ACTION_GET.CHANGE_STATUS),
        Actions.GetActionByCode(ACTION_GET.NEW_VER)
    ]

    @ViewChildren("validate") validate: QueryList<any> = new QueryList<any>();
    @ViewChild('advChipList') advChipList: any;
    @ViewChild('date') date:any


    subscription$: Subscription = new Subscription();
    pageSubscription$: Subscription = new Subscription();

    constructor(protected _modelService: SearchFilterModalService) { }

    advanceSearchFields() {
        this.searchResult = [];
        this.searchResult = CommonMethods.prepareSearchChipInfo(this.validate.toArray(), this.advChipList)
    }

    bindGridData(gridData: any) {
        let searchAction: GridPageActions = new GridPageActions();
        searchAction.basicInfo = { action: this.actions, onActionClick: (data, action) => this.getActionClickData(data, action) };
        gridData = searchAction.appendActions(gridData, "NO_CONDITION");
        this.dataSource = CommonMethods.bindMaterialGridData(CommonMethods.increaseSNo(gridData));
    }
    getActionClickData(data: any, action: string) {
    }

    clear() {
        CommonMethods.clear(this.validate.toArray());
    }

    closeModal(id: string) {
        this._modelService.close(id);
    }
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
        this.pageSubscription$.unsubscribe();
    }
}