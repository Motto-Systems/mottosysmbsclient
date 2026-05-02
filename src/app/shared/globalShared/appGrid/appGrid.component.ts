import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CheckBoxDisableBO, DropdownStates, DropDownStatesInput, TableLayout, DisplayIconBO, ActionBO } from "./appGrid.model";
import { CommonMethods } from "../../utility/commonMethods";
import { StateCode } from "../../utility/constant";
@Component({
  selector: 'app-grid',
  templateUrl: './appGrid.html',
  standalone: false
})
export class AppGridComponent implements OnChanges, OnDestroy {

  @Input() headers: Array<any> = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() extraColumns: Array<TableLayout> = [];
  @Input() isShowPagination: boolean = false;
  @Input() allCheckboxSelected: boolean = false;
  @Input() isAllowMouseEvt: boolean = false;
  @Input() isShowHeaderCheckbox: boolean = true;
  @Input() iconList: Array<DisplayIconBO> = [];
  @Output('isSelectedCheckBox') isSelectedCheckBox: EventEmitter<any> = new EventEmitter();
  @Output() onRowClicked: EventEmitter<any> = new EventEmitter();
  @Input() chkBoxItemDisableBO: CheckBoxDisableBO = new CheckBoxDisableBO();
  @Input() isSearchGrid: boolean = false;
  //table row expand...
  @Input() isShowExtColumn: boolean = true;
  @Input() isFlexLayoutExtraCol: boolean = true;
  @Input() expandIconDisable: CheckBoxDisableBO = new CheckBoxDisableBO();
  @Input() expandIconTooltip: string = "No data available";
  @Input() isShowStatesDropDown = false;
  @Input() isShowSearchBar = false;
  @Input() getBackgroundColor!: (row: any) => string;
  dynamicGridDataSource: MatTableDataSource<any> = new MatTableDataSource();
  dropDownStateInputField: DropDownStatesInput = new DropDownStatesInput();
  DropdownStatesData: DropdownStates = new DropdownStates();
  @Input() isShowActiveData: boolean = false;
  // gridDataInitialSize = 100;
   @Input() gridDataInitialSize = 100;
  searchText = "";
  filterGridData: MatTableDataSource<any> = new MatTableDataSource();
  StatefilterData: MatTableDataSource<any> = new MatTableDataSource();
  @Input() searchPlaceholder: string = "";
  @Output() onscreenActionEmit: EventEmitter<any> = new EventEmitter();
  @Input() isExtraColList: boolean = false;
  @Input() showNewButton: boolean = false;
  @Input() btnTitle: string = "";
  @Input() isShowSkeleton: boolean = false;
  @Input() columnActions: Array<ActionBO> = [];
  @Input() gridCssClass: string = "";
  @Input() noDataTitle: string = "No Data Available";
  @Input() isManage: boolean = true;

  //On Icon Clicked...
  @Output() iconClicked: EventEmitter<any> = new EventEmitter();

  tempHeaderData: Array<any> = [];

  private _isEditCol: boolean = false;
  private _displayedColumns: any[] = [];

  get displayedColumns(): any[] {
    return this._displayedColumns;
  }

  set displayedColumns(val: any[]) {
    this._displayedColumns = val;
  }

  get isEditCol() {
    return this._isEditCol;
  }

  set isEditCol(val: any | boolean) {
    this._isEditCol = val;
  }

  constructor() { }

  formatIncomingString(val: any, sourceField: string, header: any) {
    if (sourceField == 'select')
      return "";
    else if (this.isDateTime(val))
      return new Date(val).toLocaleString();

    return CommonMethods.formatValueString(val, false);
  }

  isDateTime(value: any): boolean {
    const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{1,3}Z$/;
    return isoDateTimeRegex.test(value) && !isNaN(Date.parse(value));
  }

  ngOnChanges() {
    this.updateColumnDef();
    this.gridDataInitialSize = this.dataSource?.data?.length;
    if (this.dataSource?.data?.length > 0) {
      this.dataSource?.data.forEach(item => {
        item.isChkboxDisable = (item?.state === StateCode.obsolete);
      });
    }

    this.dynamicGridDataSource.data = (this.dataSource?.data?.length > this.gridDataInitialSize) ? this.dataSource?.data?.slice(0, this.gridDataInitialSize) : this.dataSource?.data;
    this.filterGridData = new MatTableDataSource(this.dataSource?.data);

    //To show only Active data
    if (this.isShowActiveData) {
      this.isShowStatesDropDown = false;
      this.dropDownStateInputField.currentState = "ACTIVE";
      this.StatefilterData.data = this.statesFilterDatasource();
      this.dynamicGridDataSource.data = (this.StatefilterData.data?.length > this.gridDataInitialSize) ? this.StatefilterData.data.slice(0, this.gridDataInitialSize) : this.StatefilterData.data;
      this.updateSrNo();
    }

    if (CommonMethods.hasValue(this.dropDownStateInputField.currentState) && this.isShowStatesDropDown) {
      //Causing issue
      // this.StatefilterData.data = this.filterGridData.data.filter((entry: any) => entry.state === this.dropDownStateInputField.currentState);
      //Fixed that issue
      this.StatefilterData.data = this.statesFilterDatasource();
      this.dynamicGridDataSource.data = (this.StatefilterData.data?.length > this.gridDataInitialSize) ? this.StatefilterData.data.slice(0, this.gridDataInitialSize) : this.StatefilterData.data;
      this.updateSrNo();
    }
  }

  statesFilterDatasource() {
    const state = this.dropDownStateInputField.currentState;
    return state === "ALL"
      ? this.filterGridData?.data
      : this.filterGridData?.data?.filter((e: any) => e.state === state);
  }

  ngOnInIt() {
    //this.getState("ACTIVE");
  }

  isManageFields(columnDef: string) {
    return true;
  }

  updateColumnDef() {
    if (this.headers && this.headers.length > 0) {
      this.displayedColumns = this.headers.filter(x => x.isShow).map(x => x.columnDef);
      if ((CommonMethods.hasValue(this.columnActions) && this.columnActions.length > 0))
        this.displayedColumns.push("activities");
      this.displayedColumns = this.headers[0].isShowActions ? this.displayedColumns.concat(["actions"]) : this.displayedColumns;
      if (this.extraColumns && this.extraColumns.length > 0 && this.isShowExtColumn)
        this.displayedColumns.push('extAction')
    }
  }

  onRowSelected(row: any) {
    if (CommonMethods.hasValue(this.dataSource) && CommonMethods.hasValue(this.dataSource.data)) {
      this.dataSource.data.forEach(x => { x.class = 'todo-row'; });
      row.class = "todo-row-active";
      this.onRowClicked.emit(row);
      if (typeof this.getBackgroundColor === 'function') {
        row.backgroundColor = this.getBackgroundColor(row);
      } else {
        row.backgroundColor = 'white';
      }
    }
  }

  selectAllCheckBoxes(evt: any) {
    // if (evt.checked)
    //   this.dataSource.data.forEach((x) => { x['select'] = true; })
    // else
    //   this.dataSource.data.forEach((x) => { x['select'] = false; })

    const shouldSelect = evt.checked;
    this.dynamicGridDataSource?.data.forEach(item => {
      const isDisabled = this.isChkItemDisable(item);
      if (isDisabled) {
        item['select'] = item['select'] || false;
        return;
      }

      item['select'] = (shouldSelect && item.status !== 'Discarded' && item.state !== "OBSOLETE");
      if (typeof this.getBackgroundColor === 'function') {
        item.backgroundColor = this.getBackgroundColor(item);
      } else {
        item.backgroundColor = 'white';
      }
    });

    this.allCheckboxSelected = evt.checked;
    var list = this.dataSource.data.filter(x => x.select == true);

    this.isSelectedCheckBox.emit({ checked: evt.checked, val: list, selected: "ALL" })
  }

  selectSingleChk(evt: any, row: any) {
    if (evt.checked)
      row['select'] = true;
    else
      row['select'] = false;

    var list = this.dataSource.data.filter(x => x.select == true);
    var disableList = this.dataSource.data.filter(x => x.status != "Discarded");
    if (list.length == disableList.length)
      this.allCheckboxSelected = true;
    else
      this.allCheckboxSelected = false;

    this.isSelectedCheckBox.emit({ checked: evt.checked, val: list, selected: "SINGLE" })
  }


  hasValue(evt: any) {
    return CommonMethods.hasValue(evt);
  }



  showCheckbox(row: any, columnDef: string) {
    if (row.showCheckbox === false && columnDef == 'select')
      return false;
    else if (row.showCheckbox && columnDef == 'select')
      return true;
    else if (columnDef == 'select')
      return true;
    else
      return false;
  }

  checkIconConditions(header: any, data: any) {
    var isShow: boolean = true;
    if (CommonMethods.hasValue(header['isShowConditionBased'])) {
      isShow = false;
      if (CommonMethods.hasValue(header['conditionValue']) && (header['conditionValue'].includes(data['columnDef']) || header['conditionValue'].includes(data[header['columnDef']])))
        isShow = true;
    }
    return isShow
  }

  getIcontooltip(value: any) {
    if (this.iconList && this.iconList.length > 0) {
      var obj = this.iconList.filter((x: DisplayIconBO) => x.value == value);
      if (obj && obj.length > 0)
        return obj[0].tooltip;
      return "";
    }
    return "";
  }

  getIconName(value: any) {
    let icon: any;
    if (this.iconList && this.iconList.length > 0) {
      var obj = this.iconList.filter((x: DisplayIconBO) => x.value == value);
      if (obj && obj.length > 0)
        icon = obj[0].icon;
    }

    return icon;
  }

  getClassName(value: any) {
    if (this.iconList && this.iconList.length > 0) {
      var obj = this.iconList.filter((x: DisplayIconBO) => x.value == value);
      if (obj && obj.length > 0)
        return obj[0].className;
    }

    return "";
  }


  isChkItemDisable(item: any) {
    if (CommonMethods.hasValue(this.chkBoxItemDisableBO.property)) {
      return this.chkBoxItemDisableBO.values.includes(item[this.chkBoxItemDisableBO.property]);
    }
    else
      return item.isChkboxDisable;
  }

  isExpandIconDisable(item: any) {
    return this.hasDisableValue(this.expandIconDisable, item);
  }

  hasDisableValue(obj: CheckBoxDisableBO, item: any): boolean {
    let bool: boolean = false;
    if (CommonMethods.hasValue(obj.property)) {
      bool = obj.values.includes(item[obj.property]);
    }
    return bool;
  }

  loadMoreData(event: any) {
    this.dynamicGridDataSource.data = event;
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let baseData = this.dataSource.data;
    if ((this.dropDownStateInputField.currentState === 'ACTIVE' || this.dropDownStateInputField.currentState === 'OBSOLETE'))
      baseData = (this.StatefilterData?.data?.length > 0) ? this.StatefilterData.data : baseData;

    if (baseData.length > 0)
      this.dynamicGridDataSource.data = this.filterDataSourceData(baseData, filterValue);

    this.updateSrNo();
  }

  filterDataSourceData(data: any, searchText: any) {
    return data.filter((item: any) => {
      return Object.keys(item).some(key => {
        const value = item[key];
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase());
      });
    });
  };

  getState(state: string) {
    this.dropDownStateInputField.currentState = state;
    this.dynamicGridDataSource.data = [];
    if (state === 'ACTIVE') {
      this.StatefilterData.data = this.filterGridData.data.filter((entry: any) => entry.state === 'ACTIVE');
      this.dynamicGridDataSource.data = (this.StatefilterData.data?.length > this.gridDataInitialSize) ? this.StatefilterData.data.slice(0, this.gridDataInitialSize) : this.StatefilterData.data;
    }
    else if (state === 'OBSOLETE') {

      this.StatefilterData.data = this.filterGridData.data.filter((entry: any) => entry.state === 'OBSOLETE');
      this.dynamicGridDataSource.data = (this.StatefilterData.data?.length > this.gridDataInitialSize) ? this.StatefilterData.data.slice(0, this.gridDataInitialSize) : this.StatefilterData.data;

      // this.dynamicGridDataSource.data = this.filterGridData.data.filter((entry: any) => entry.state === 'OBSOLETE');
    }
    else {
      this.dynamicGridDataSource.data = (this.filterGridData.data?.length > this.gridDataInitialSize) ? this.filterGridData.data.slice(0, this.gridDataInitialSize) : this.filterGridData.data;
    }

    this.updateSrNo();
  }

  updateSrNo() {
    this.dynamicGridDataSource.data = [...CommonMethods.increaseSNo(this.dynamicGridDataSource.data)];
    this.dynamicGridDataSource._updateChangeSubscription(); // Ensure the table is refreshed
  }

  onscreenActionClick(item: any, data: any) {
    this.onscreenActionEmit.emit({ action: item, data: data });
  }

  onIconClick(row: any, item: any): void {
    // if (row?.['matIn'] == "matIn" || row?.['matOut'] == "matOut")
    // Emit the row data and the item when the icon is clicked
    return this.iconClicked.emit({ row, item });
  }

  getFormattedClass(title: string | number | null | undefined): string {
    if (title == null) return ''; // covers null and undefined

    return title
      .toString() // safely convert number → string
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces & special characters with "-"
      .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
  }

  getStatusRow(row: any) {
    if (CommonMethods.hasValue(row['systemData.formState']))
      return ' mspl-row-' + this.getFormattedClass(row['systemData.formState']);
    if (CommonMethods.hasValue(row['state']))
      return ' mspl-row-' + this.getFormattedClass(row['state']);
    return '';
  }


  getActions(actions: any, type: string = "Actions") {
    if (CommonMethods.hasValue(actions) && CommonMethods.hasValue(actions.action)) {
      if (type == "Actions")
        return actions.action.filter((x: any) => x.action != "Exception");
      else
        return actions.action.filter((x: any) => x.action == "Exception");
    }
    return [];
  }

  ngOnDestroy() {
    this.dropDownStateInputField.currentState = "";
  }
}
