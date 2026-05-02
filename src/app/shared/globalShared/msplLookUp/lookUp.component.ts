// import { Component, Input, Output, EventEmitter, SimpleChanges, OnDestroy } from "@angular/core";
// import { Subscription } from "rxjs";
// import { Overlay } from "@angular/cdk/overlay";
// import { ComponentPortal } from "@angular/cdk/portal";
// import { MsplLookupGridComponent } from "./lookupGrid.component";
// import { AppLabel } from "../customLabel/customLabelModal";
// import { AlertService } from "../../../core/services/alert.service";
// import { MasterService } from "../../../core/services/master.service";
// import { CommonMethods } from "../../utility/commonMethods";
// import { LookupDataInfo, LookupFetchBO, LookupFilterBO, LookupHeaderInfo } from "./lookUpModel";
// import { CustomFieldMessages } from "../../utility/constant";
// import { CommonServiceUrls } from "../../utility/commonServiceUrls";
// import { environment } from "../../../../environments/environment";
// import { AppContextService } from "../../../core/context/appContext.service";

// @Component({
//     selector: 'mspl-lookup',
//     templateUrl: './lookUp.html',
//     styleUrl: './lookup.scss',
//     standalone: false
// })

// export class MsplLookupComponent implements OnDestroy {

//     @Input() lookupCode: string = "";
//     @Input() lookupTitle: string = "";
//     @Input() selectedValue: any = {};
//     @Input() formData: any = {};
//     @Input() filters: Array<any> = [];
//     @Input() requestID: string = "";
//     @Input() fieldControlBo: any;// = new FieldControlBO();

//     info: LookupDataInfo = new LookupDataInfo();
//     lookupHeaderInfo: Array<LookupHeaderInfo> = [];
//     @Output() onSelect: EventEmitter<any> = new EventEmitter();
//     searchVal: string = '';
//     displayTextVal: string = '';
//     selectedData: any;
//     headerData: any = [];
//     dataSource: any;
//     subscription$: Subscription = new Subscription();
//     @Input() disableBtn: boolean = false;
//     @Input() isMandatory: boolean = false;
//     uniqueId: string = "id-1";
//     labelObj: AppLabel = { placeholder: this.info.lookupTitle, inputValue: "" }
//     length: number = 0;
//     isManage: boolean = true;
//     overlayRef: any;
//     componentType: string = "LOOKUP"; // using for set mode in common methods
//     @Input() isShowSearchText: boolean = true;
//     @Input() isShowSelectText: boolean = false;
//     @Input() isDisabled: boolean = false;
//     lookupCodeData: string = "";

//     constructor(private _alert: AlertService,
//         private _service: MasterService, private overlay: Overlay,
//         private _context: AppContextService) {

//         this.uniqueId = "id-" + String(Math.floor(1000 * Math.random()));

//         this.subscription$ = this._service.subject$.subscribe((resp: any) => {
//             if (resp.purpose == "getLookupData_" + this.uniqueId) {
//                 this.length = resp.result.length;

//                 if (this.info.multiSelectOption && this.selectedData) {
//                     this.selectedData.forEach((item: any) => {
//                         resp.result.filter((x: any) => x.valueID == item.valueID).forEach((y: any) => {
//                             y['select'] = true;
//                         })
//                     })
//                 }
//                 resp.result.forEach((x: any) => delete x._id);
//                 this.dataSource = CommonMethods.bindMaterialGridData(resp.result);
//                 this.displayOverlay();
//             }
//             else if (resp.purpose == "getLookupHeader_" + this.uniqueId) {
//                 if (CommonMethods.hasValue(resp.result)) {
//                     this.info = resp.result;
//                     if (!CommonMethods.hasValue(this.info.apiPath))
//                         this.info.apiPath = "baseUrl";

//                     if (CommonMethods.hasValue(this.lookupTitle))
//                         this.info.lookupTitle = this.lookupTitle;
//                     this.lookupHeaderInfo = resp.result.lookupFields.options
//                     this.prepareGridHeaders();

//                     this.getLookUpData();
//                 }
//             }
//         });
//     }

//     ngOnChanges(changes: SimpleChanges) {
//         if (changes["lookupCode"]?.previousValue != changes["lookupCode"]?.currentValue)
//             this.lookupCodeData = changes["lookupCode"]?.currentValue;
//         if (changes["lookupTitle"]?.previousValue != changes["lookupTitle"]?.currentValue)
//             this.info.lookupTitle = this.lookupTitle;
//         if (CommonMethods.hasValue(changes["selectedValue"]?.currentValue))
//             this.setRow(this.selectedValue);
//     }

//     getLookUpData() {
//         let obj: LookupFetchBO = new LookupFetchBO();
//         obj.lookupCode = this.lookupCode;
//         obj.searchText = this.searchVal;
//         obj.filters = [];

//         if (this.filters && this.filters.length > 0) {
//             this.filters?.forEach(x => {
//                 let formData = this.formData;
//                 formData["requestID"] = this.requestID;
//                 formData["unitId"] = this._context.appContext.userDetails.unitActualID;

//                 var value;
//                 if (CommonMethods.hasValue(x.value))
//                     value = x.value
//                 else
//                     value = x.propertyName.includes(".") ? CommonMethods.getNestedProperty(formData, x.propertyName) :
//                         CommonMethods.isObjectValue(formData[x.propertyName]) ? CommonMethods.getObjectValueID(formData[x.propertyName]) : formData[x.propertyName];

//                 let item: LookupFilterBO = new LookupFilterBO(x.parameterName, value, x.isMandatory);
//                 obj.filters.push(item);
//             })
//         }

//         let apiConnectionUrl = (environment as any)[this.info.apiPath];
//         if (!CommonMethods.hasValue(apiConnectionUrl))
//             apiConnectionUrl = environment.baseUrl;

//         this._service.postApiService(CommonServiceUrls.getLookupInfo, obj, "getLookupData_" + this.uniqueId, [], apiConnectionUrl);
//     }

//     onLookupClick() {
//         this.displayTextVal = '';
//         this.searchVal = '';
//         this.dataSource = CommonMethods.bindMaterialGridData('');
//         this.headerData = [];
//         this.length = -1;
//     }

//     /** On search icon click event */
//     onFilterClick() {
//         this.length = 0;
//         this.searchVal = CommonMethods.hasValue(this.searchVal) ? `${this.searchVal}`.trim() : "";
//         // if (environment.production && `${this.searchVal}`.trim().length < environment.lookupMinLength)
//         //     return this._notify.warning("Please enter minimum " + environment.lookupMinLength + " characters");

//         if (CommonMethods.hasValue(this.lookupCode))
//             this._service.getApiService(CommonServiceUrls.getLookupInfoByLookUpCode, [this.lookupCode], "getLookupHeader_" + this.uniqueId, environment.fmeBaseUrl);

//     }

//     /** On selected row event */
//     onRowClick(data: any, type: string) {

//         if (type == "CHECK_BOX") {

//             let _selectedData: Array<any> = this.dataSource.data.filter((x: any) => x.select);

//             _selectedData.forEach((item: any) => {
//                 let data: any = "";
//                 data = item[this.info.lookupDisplayField];
//                 delete data._id;
//                 delete data.class;
//                 delete data.backgroundColor;
//                 item['displayData'] = data;
//             });

//             if (CommonMethods.hasValue(this.selectedData)) {
//                 _selectedData.forEach(x => {
//                     if (this.selectedData.filter((y: any) => y.valueID == x.valueID).length == 0) {
//                         this.selectedData.push(x);
//                     }
//                 });

//                 if (!data.checked) {
//                     if (data.selected == "SINGLE") {
//                         this.removeUnSelectItem(data.row.valueID);
//                     }
//                     else {
//                         this.dataSource.data.forEach((x: any) => {
//                             this.removeUnSelectItem(x.valueID);
//                         });
//                     }
//                 }
//             }
//             else {
//                 this.selectedData = _selectedData;
//             }
//             this.onSelect.emit({ action: this.info.lookupCode, text: this.selectedText, val: CommonMethods.hasValue(this.selectedData) ? this.selectedData : _selectedData });

//             this.labelObj = { placeholder: this.info.lookupTitle, inputValue: this.selectedText };
//         }
//         else {

//             const displayText: any = data[this.info.lookupDisplayField];
//             if (CommonMethods.isObjectValue(displayText)) {
//                 this.displayTextVal = displayText?.displayData;
//             } else this.displayTextVal = data[this.info.lookupDisplayField];

//             this.displayTextVal = String(CommonMethods.formatValueString(this.displayTextVal));
//             data['displayData'] = data[this.info.lookupDisplayField];
//             delete data._id;
//             this.selectedData = data;

//             this.onSelect.emit({ action: this.info.lookupCode, text: this.displayTextVal, val: data });
//             this.labelObj = { placeholder: this.info.lookupTitle, inputValue: this.selectedText }
//             this.searchVal = this.displayTextVal;
//         }
//     }

//     removeUnSelectItem(id: number) {
//         let index = this.selectedData.findIndex((x: any) => x.valueID == id);
//         this.selectedData.splice(index, 1);
//     }

//     /** To bind selectd value from parent component */
//     setRow(selectedVal: any) {
//         var selectedText: string = "";
//         if (this.info.multiSelectOption && selectedVal && selectedVal.length > 0) {
//             selectedText = selectedVal.map((item: any) => {
//                 return item.displayData;
//             }).join(', ');

//             // selectedVal.forEach((item: any) => {
//             //     item.code = item[this.info.displayField];
//             //     item.data = item.name;
//             // });

//             this.selectedData = selectedVal;
//         }
//         else if (CommonMethods.hasValue(selectedVal) && selectedVal?.displayData) {

//             selectedText = String(CommonMethods.formatValueString(selectedVal.displayData));

//             this.selectedData = selectedVal;
//         }

//         this.displayTextVal = selectedText;
//         this.searchVal = selectedText;
//         this.labelObj = { placeholder: this.info.lookupTitle, inputValue: selectedText }
//     }

//     get selectedId() {
//         if (CommonMethods.hasValue(this.selectedData))
//             return this.selectedData.valueID;
//         else
//             return null;
//     }

//     get selectedText() {
//         return this.displayTextVal;
//     }

//     get selectedRow() {
//         return this.selectedData;
//     }

//     /** To prepare header table header */
//     prepareGridHeaders() {
//         this.headerData = [];

//         if (this.info.multiSelectOption)
//             this.headerData.push({ "columnDef": 'select', "header": "", cell: (element: any) => `${element.select}`, isShow: true, width: 'maxWidth-9per' });

//         this.lookupHeaderInfo.forEach((x: any) => {
//             this.headerData.push({ "columnDef": x.itemID, "header": x.item, cell: (element: any) => `${element[x.itemID]}`, isShow: true });
//         })
//     }

//     /** To clear select value */
//     clear() {
//         this.displayTextVal = "";
//         this.selectedData = null;
//         this.onSelect.emit({ action: this.info?.lookupCode, text: "", val: null });
//         this.labelObj.inputValue = "";
//         this.searchVal = "";
//     }

//     ngAfterContentInit() {
//         if (this.info == undefined) {
//             this.info = new LookupDataInfo();
//             this.info.lookupTitle = "";
//         }
//     }

//     getLabelObj() {
//         // this.labelObj.placeholder = this.lookupTitle;

//         if (this.disableBtn) {
//             this.labelObj.inputValue = this.selectedValue?.displayData;
//             this.info.lookupTitle = this.lookupTitle;
//             this.searchVal = this.selectedValue?.displayData;
//             this.labelObj.placeholder = this.fieldControlBo?.label;
//         }

//         this.labelObj.placeholder = this.lookupTitle; // To show label heading in view mode; Commented 288;

//         return this.labelObj;
//     }

//     validation(type: string = "") {
//         if (this.info.multiSelectOption) {
//             if (this.isMandatory && (!this.selectedData || this.selectedData.length == 0))
//                 return CustomFieldMessages.singleDdwn + this.info.lookupTitle.toLowerCase();
//         }
//         else if (!CommonMethods.hasValue(this.selectedId) && (this.isMandatory || type == "SEARCH")) {
//             return CustomFieldMessages.singleDdwn + this.info.lookupTitle.toLowerCase();
//         }

//         return;
//     }

//     displayOverlay() {
//         if (this.overlayRef)
//             this.overlayRef.detach();

//         const target = document.querySelector("#lkp-" + this.uniqueId) as HTMLElement;
//         this.overlayRef = this.overlay.create({
//             hasBackdrop: true,
//             backdropClass: "cdk-overlay-transparent-backdrop",
//             positionStrategy: this.overlay
//                 .position()
//                 .flexibleConnectedTo(target)
//                 .withPositions([
//                     {
//                         originX: "center",
//                         originY: "bottom",
//                         overlayX: "center",
//                         overlayY: "top",
//                     },
//                     {
//                         originX: "center",
//                         originY: "top",
//                         overlayX: "center",
//                         overlayY: "bottom",
//                     },
//                 ]),
//             width: target.getBoundingClientRect().width,
//         });
//         const component = new ComponentPortal(MsplLookupGridComponent);
//         const componentRef = this.overlayRef.attach(component);
//         componentRef.instance.dataSource = this.dataSource;
//         componentRef.instance.headerData = this.headerData;
//         componentRef.instance.length = this.length;
//         componentRef.instance.lookupCode = this.lookupCode;
//         componentRef.instance.multiSelectOption = this.info.multiSelectOption;

//         componentRef.instance.onRowSelected.subscribe((resp: any) => {
//             this.overlayRef.detach();
//             this.onRowClick(resp, 'SINGLE');
//         });
//         componentRef.instance.allSelected.subscribe((resp: any) => {
//             this.onRowClick(resp, 'CHECK_BOX');
//         });

//         this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
//     }

//     setMode(val: boolean) {
//         this.isManage = val;
//     }

//     removeItem(idx: number) {
//         this.selectedData.splice(idx, 1);
//         this.onSelect.emit({ action: this.info.lookupCode, text: this.selectedText, val: CommonMethods.hasValue(this.selectedData) ? this.selectedData : "" });

//     }

//     clearMultSelect() {
//         if (this.info.multiSelectOption) {
//             let selectedText = "";

//             if (this.disableBtn && this.selectedData && this.selectedData.length > 0) {
//                 selectedText = this.selectedData.map((item: any) => {
//                     let data: any = "";
//                     data = item[this.info.lookupDisplayField];
//                     return data;
//                 }).join(', ');
//             }

//             this.displayTextVal = selectedText;
//             this.searchVal = selectedText;
//             this.labelObj = { placeholder: this.info.lookupTitle, inputValue: selectedText }
//         }
//     }

//     ngOnDestroy(): void {
//         this.subscription$.unsubscribe();
//     }
// }


import { Component, Input, Output, EventEmitter, SimpleChanges, signal, OnDestroy } from "@angular/core";
import { debounceTime, filter, Subject, Subscription, tap } from "rxjs";
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { MsplLookupGridComponent } from "./lookupGrid.component";
import { AppLabel } from "../customLabel/customLabelModal";
import { AlertService } from "../../../core/services/alert.service";
import { MasterService } from "../../../core/services/master.service";
import { CommonMethods } from "../../utility/commonMethods";
import { LookupDataInfo, LookupFetchBO, LookupFilterBO, LookupHeaderInfo } from "./lookUpModel";
import { CustomFieldMessages } from "../../utility/constant";
import { CommonServiceUrls } from "../../utility/commonServiceUrls";
import { environment } from "../../../../environments/environment";
//import { ApiUrls } from "../../utility/environmentKeys";
import { FieldControlBO, DependentParameterFieldBO } from "../../utility/commonModel";
import { AppContextService } from "../../../core/context/appContext.service";

@Component({
    selector: 'mspl-lookup',
    templateUrl: './lookUp.html',
    styleUrl: './lookup.scss',
    standalone: false
})

export class MsplLookupComponent implements OnDestroy {

    @Input() lookupCode: string = "";
    @Input() workflowTitle: string = "";
    @Input() selectedLookUpId: string = "";
    @Input() selectedLookUpData: any;
    @Input() fieldControlBo: FieldControlBO = new FieldControlBO();                                                             
    @Input() lookupTitle: string = "";
    @Input() selectedValue: any = {};
    @Input() formData: any = {};
    @Input() filters: Array<DependentParameterFieldBO> = [];
  
    info: LookupDataInfo = new LookupDataInfo();
    lookupHeaderInfo: Array<LookupHeaderInfo> = [];
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    searchVal: string = '';
    displayTextVal: string = '';
    selectedData: any;
    headerData: any = [];
    dataSource: any;
    subscription$: Subscription = new Subscription();
    @Input() disableBtn: boolean = false;
    @Input() isMandatory: boolean = false;
    uniqueId: string = "id-1";
    private lastFilterTime: number = 0;
    labelObj: AppLabel = { placeholder: this.info.lookupTitle, inputValue: "" }
    length: number = 0;
    isManage: boolean = true;
    overlayRef: any;
    componentType: string = "LOOKUP"; // using for set mode in common methods
    @Input() isShowSearchText: boolean = false;
    @Input() isShowSelectText: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() requestID: string = "";
    lookupCodeData: string = "";
    isShowLookupGrid: boolean = false;
    isShowLookupGridData: boolean = false;
    appCode: string = "";
    lookupInitialSize: number = 6;

    componentRef: any; // Store component reference for updates
    isLoadingMore: boolean = false; // To show loader at bottom of table
    hasMoreData: boolean = true; // To check if more data is available
    currentItemsLoaded: number = 0; // Track current loaded items

    isLoading = signal<boolean>(false);
    private readonly filterClick$ = new Subject<void>();

    url: string = "";
    constructor(private _alert: AlertService, private _context: AppContextService,
        private _service: MasterService, private overlay: Overlay) {

        this.uniqueId = "id-" + String(Math.floor(1000 * Math.random()));

        this.subscription$.add(this._service.subject$.subscribe((resp: any) => {
            if (resp.purpose == "getLookupData_" + this.uniqueId) {
                this.isLoading.set(false);
                this.isLoadingMore = false; // Hide loader
                this.length = resp.result.totalRecords;

                var resultData = CommonMethods.convertJsonString(resp.result.lookupData);

                // Check if we have more data to load
                this.currentItemsLoaded += resultData.length;
                this.hasMoreData = this.currentItemsLoaded < this.length;

                if (this.info.multiSelectOption && this.selectedData) {
                    this.selectedData.forEach((item: any) => {
                        resultData.filter((x: any) => x.valueID == item.valueID).forEach((y: any) => {
                            y['select'] = true;
                        })
                    })
                }
                resultData.forEach((x: any) => delete x._id);
                // Append new data to existing data
                if (this.currentItemsLoaded > resultData.length) {
                    // This is loading more data, append to existing
                    this.dataSource = CommonMethods.bindMaterialGridData([...this.dataSource.data, ...resultData]);
                } else {
                    // This is initial load
                    this.dataSource = CommonMethods.bindMaterialGridData(resultData);
                }

                // Update existing component if overlay is open
                if (this.componentRef) {
                    this.updateComponentData();
                } else {
                    this.displayOverlay();
                }
            } else if (resp.purpose == "getLookupHeader_" + this.uniqueId) {
                if (CommonMethods.hasValue(resp.result)) {
                    this.info = resp.result;
                    this.dataSource = CommonMethods.bindMaterialGridData([]);
                    if (CommonMethods.hasValue(this.lookupTitle))
                        this.info.lookupTitle = this.lookupTitle;
                    this.lookupHeaderInfo = resp.result.lookupFields.options
                    this.prepareGridHeaders();

                    this.getLookUpData();
                }
            }
        }));

        this.subscription$.add(
            this.filterClick$.pipe(debounceTime(300),
                filter(() => !this.isLoading()),
                tap(() => {
                    this.isLoading.set(true);
                    this.executeLkpFilterData();
                })
            ).subscribe()
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes["lookupCode"]?.previousValue != changes["lookupCode"]?.currentValue && CommonMethods.hasValue(changes["lookupCode"]?.currentValue)) {
        //     this.lookupCodeData = changes["lookupCode"]?.currentValue;
        //     this.clear();

        //     this.isShowLookupGrid = true;
        //     this.onFilterClick();
        // }

        // if (CommonMethods.hasValue(this.lookupCodeData) && changes["selectedLookUpData"]?.previousValue != changes["selectedLookUpData"]?.currentValue &&
        //     CommonMethods.hasValue(changes["selectedLookUpData"]?.currentValue)) {
        //     this.isShowLookupGridData = true;
        //     this.getLookUpData();
        // }
        if (changes["lookupCode"]?.previousValue != changes["lookupCode"]?.currentValue)
            this.lookupCodeData = changes["lookupCode"]?.currentValue;
        if (changes["lookupTitle"]?.previousValue != changes["lookupTitle"]?.currentValue)
            this.info.lookupTitle = this.lookupTitle;
        if (CommonMethods.hasValue(changes["selectedValue"]?.currentValue))
            this.setRow(this.selectedValue);
    }

    getLookUpData(itemsLoaded: number = 0, lastValueId?: any) {
        let obj: LookupFetchBO = new LookupFetchBO();
        obj.lookupCode = this.lookupCode;
        obj.searchText = this.searchVal;
        obj.filters = [];
        obj.noOfItemsLoaded = itemsLoaded;

        if (lastValueId !== undefined) {
            obj.lastId = String(lastValueId);
        }

        if (this.filters && this.filters.length > 0) {
            this.filters?.forEach(x => {
                let formData = this.formData;
                formData["requestID"] = this.requestID;
                formData["unitId"] = this._context.appContext.userDetails.unitActualID;

                var value;
                if (CommonMethods.hasValue(x.value))
                    value = x.value
                else
                    value = x.propertyName.includes(".") ? CommonMethods.getNestedProperty(formData, x.propertyName) :
                        CommonMethods.isObjectValue(formData[x.propertyName]) ? CommonMethods.getObjectValueID(formData[x.propertyName]) : formData[x.propertyName];

                let item: LookupFilterBO = new LookupFilterBO(x.parameterName, value, x.isMandatory);
                obj.filters.push(item);
            })
        }

        let apiConnectionUrl = (environment as any)[this.info.apiPath];
        if (!CommonMethods.hasValue(apiConnectionUrl))
            apiConnectionUrl = environment.baseUrl;

        obj.isFromHistory = JSON.parse(sessionStorage.getItem('isHistory') || 'false');
        this._service.postApiService(CommonServiceUrls.getLookupInfo, obj, "getLookupData_" + this.uniqueId, [], apiConnectionUrl);
    }

    onLookupClick() {
        this.displayTextVal = '';
        this.searchVal = '';
        this.dataSource = CommonMethods.bindMaterialGridData([]);
        this.headerData = [];
        this.length = -1;
        this.currentItemsLoaded = 0; // Reset items loaded count
        this.hasMoreData = true; // Reset more data flag
        this.isLoadingMore = false; // Reset loading state
    }

    /** On search icon click event */
    onFilterClick() {
        this.filterClick$.next();
    }

    executeLkpFilterData() {
        if (!CommonMethods.hasValue(this.lookupCode))   {
            this.isLoading.set(false);
            this._alert.warning('Lookup Code is required to fetch data.');
            return;
        }

        this.length = 0;
        this.currentItemsLoaded = 0; // Reset items loaded count
        this.hasMoreData = true; // Reset more data flag
        this.isLoadingMore = false; // Reset loading state
        this.searchVal = `${this.searchVal}`.trim();
        this.dataSource = CommonMethods.bindMaterialGridData([]);

        this._service.getApiService(CommonServiceUrls.getLookupInfoByLookUpCode, [this.lookupCode, this.searchVal], "getLookupHeader_" + this.uniqueId, environment.fmeBaseUrl);

    }

    /** On selected row event */
    onRowClick(data: any, type: string) {

        if (type == "CHECK_BOX") {

            let _selectedData: Array<any> = this.dataSource.data.filter((x: any) => x.select);

            _selectedData.forEach((item: any) => {
                let data: any = "";
                data = item[this.info.lookupDisplayField];
                delete data._id;
                item['displayData'] = data;
            });

            if (CommonMethods.hasValue(this.selectedData)) {
                _selectedData.forEach(x => {
                    if (this.selectedData.filter((y: any) => y.valueID == x.valueID).length == 0) {
                        this.selectedData.push(x);
                    }
                });

                if (!data.checked) {
                    if (data.selected == "SINGLE") {
                        this.removeUnSelectItem(data.row.valueID);
                    }
                    else {
                        this.dataSource.data.forEach((x: any) => {
                            this.removeUnSelectItem(x.valueID);
                        });
                    }
                }
            }
            else {
                this.selectedData = _selectedData;
            }
            this.onSelect.emit({ action: this.info.lookupCode, text: this.selectedText, val: CommonMethods.hasValue(this.selectedData) ? this.selectedData : _selectedData });

            this.labelObj = { placeholder: this.info.lookupTitle, inputValue: this.selectedText };
        }
        else {

            const displayText: any = data[this.info.lookupDisplayField];
            if (CommonMethods.isObjectValue(displayText)) {
                this.displayTextVal = displayText?.displayData;
            } else this.displayTextVal = data[this.info.lookupDisplayField];


            this.displayTextVal = String(CommonMethods.formatValueString(this.displayTextVal));
            data['displayData'] = this.displayTextVal;
            delete data._id;
            this.selectedData = data;

            this.onSelect.emit({ action: this.info.lookupCode, text: this.displayTextVal, val: data });
            this.labelObj = { placeholder: this.info.lookupTitle, inputValue: this.selectedText }
            this.searchVal = this.displayTextVal;
        }
    }

    removeUnSelectItem(id: number) {
        let index = this.selectedData.findIndex((x: any) => x.valueID == id);
        this.selectedData.splice(index, 1);
    }

    /** To bind selectd value from parent component */
    setRow(selectedVal: any) {
        var selectedText: string = "";
        if (this.info.multiSelectOption && selectedVal && selectedVal.length > 0) {
            selectedText = selectedVal.map((item: any) => {
                return item.displayData;
            }).join(', ');

            // selectedVal.forEach((item: any) => {
            //     item.code = item[this.info.displayField];
            //     item.data = item.name;
            // });

            this.selectedData = selectedVal;
        }
        else if (CommonMethods.hasValue(selectedVal)) {

            selectedText = String(CommonMethods.formatValueString(selectedVal.displayData));
            this.selectedData = selectedVal;
        }

        this.displayTextVal = selectedText;
        this.searchVal = selectedText;
        this.labelObj = { placeholder: this.info.lookupTitle, inputValue: selectedText }
    }



    get selectedId() {
        if (CommonMethods.hasValue(this.selectedData))
            return this.selectedData.valueID;
        else
            return null;
    }

    get selectedText() {
        return this.displayTextVal;
    }

    get selectedRow() {
        return this.selectedData;
    }

    /** To prepare header table header */
    prepareGridHeaders() {
        this.headerData = [];

        if (this.info.multiSelectOption)
            this.headerData.push({ "columnDef": 'select', "header": "", cell: (element: any) => `${element.select}`, isShow: true, width: '' });

        this.lookupHeaderInfo.forEach((x: any) => {
            this.headerData.push({ "columnDef": x.itemID, "header": x.item, cell: (element: any) => `${element[x.itemID]}`, isShow: true });
        })
    }

    /** To clear select value */
    clear() {
        this.displayTextVal = "";
        this.selectedData = null;
        this.onSelect.emit({ action: this.info.lookupCode, text: "", val: null });
        this.labelObj.inputValue = "";
        this.searchVal = "";
        this.currentItemsLoaded = 0; // Reset items loaded count
        this.hasMoreData = true; // Reset more data flag
        this.isLoadingMore = false; // Reset loading state
    }

    ngAfterContentInit() {
        if (this.info == undefined) {
            this.info = new LookupDataInfo();
            this.info.lookupTitle = "";
        }
    }

    getLabelObj() {
        if (this.disableBtn) {
            this.labelObj.inputValue = this.selectedValue?.displayData;
            this.info.lookupTitle = this.lookupTitle;
            this.searchVal = this.selectedValue?.displayData;
        }
        else if (!this.disableBtn) {
            this.labelObj.placeholder = this.info.lookupTitle;
        }
        return this.labelObj;
    }

    validation(type: string = "") {
        if (this.info.multiSelectOption) {
            if (this.isMandatory && (!this.selectedData || this.selectedData.length == 0))
                return CustomFieldMessages.singleDdwn + this.fieldControlBo?.label?.toLowerCase();
        }
        else if (!CommonMethods.hasValue(this.selectedId) && (this.isMandatory || type == "SEARCH")) {
            return CustomFieldMessages.singleDdwn + this.fieldControlBo?.label?.toLowerCase();
        }

        return;
    }

    displayOverlay() {
        if (this.overlayRef)
            this.overlayRef.detach();

        const target = document.querySelector("#lkp-" + this.uniqueId) as HTMLElement;
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: "cdk-overlay-transparent-backdrop",
            positionStrategy: this.overlay
                .position()
                .flexibleConnectedTo(target)
                .withPositions([
                    {
                        originX: "center",
                        originY: "bottom",
                        overlayX: "center",
                        overlayY: "top",
                    },
                    {
                        originX: "center",
                        originY: "top",
                        overlayX: "center",
                        overlayY: "bottom",
                    },
                ]),
            width: target.getBoundingClientRect().width,
        });
        const component = new ComponentPortal(MsplLookupGridComponent);
        this.componentRef = this.overlayRef.attach(component);
        this.updateComponentData();
        this.componentRef.instance.onRowSelected.subscribe((resp: any) => {
            this.overlayRef.detach();
            this.componentRef = null;
            this.onRowClick(resp, 'SINGLE');
        });
        this.componentRef.instance.allSelected.subscribe((resp: any) => {
            this.onRowClick(resp, 'CHECK_BOX');
        });

        // Handle load more data event
        this.componentRef.instance.loadMoreData.subscribe(() => {
            this.loadMoreLookupData();
        });

        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach();
            this.componentRef = null;
        });
    }

    /** Update component data when new data is loaded */
    updateComponentData() {
        if (this.componentRef) {
            this.componentRef.instance.dataSource = this.dataSource;
            this.componentRef.instance.lookupInitialSize = this.lookupInitialSize;
            this.componentRef.instance.headerData = this.headerData;
            this.componentRef.instance.length = this.length;
            this.componentRef.instance.multiSelectOption = this.info.multiSelectOption;
            this.componentRef.instance.isLoadingMore = this.isLoadingMore;
            this.componentRef.instance.hasMoreData = this.hasMoreData;
        }
    }

    /** Load more lookup data when scrolled to bottom */
    loadMoreLookupData() {
        if (this.isLoadingMore || !this.hasMoreData) {
            return;
        }

        this.isLoadingMore = true;
        setTimeout(() => {
            let lastValueId = undefined;
            if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
                const lastItem = this.dataSource.data[this.dataSource.data.length - 1];
                lastValueId = lastItem.valueID;
            }
            this.getLookUpData(this.currentItemsLoaded, lastValueId);
        }, 500);
    }

    setMode(val: boolean) {
        this.isManage = val;
    }

    removeItem(idx: number) {
        this.selectedData.splice(idx, 1);
        this.onSelect.emit({ action: this.info.lookupCode, text: this.selectedText, val: CommonMethods.hasValue(this.selectedData) ? this.selectedData : "" });

    }

    clearMultSelect() {
        if (this.info.multiSelectOption) {
            let selectedText = "";

            if (this.disableBtn && this.selectedData && this.selectedData.length > 0) {
                selectedText = this.selectedData.map((item: any) => {
                    let data: any = "";
                    data = item[this.info.lookupDisplayField];
                    return data;
                }).join(', ');
            }

            this.displayTextVal = selectedText;
            this.searchVal = selectedText;
            this.labelObj = { placeholder: this.info.lookupTitle, inputValue: selectedText }
        }
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
