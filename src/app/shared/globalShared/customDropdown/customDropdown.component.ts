import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { AppLabel } from '../customLabel/customLabelModal';

import { DropdownDetails } from './customDropdownModel';
import { ICustomDropdownNCheckListData } from '../customCheckList/customChecklistModel';
import { CommonMethods } from '../../utility/commonMethods';
import { CustomFieldMessages } from '../../utility/constant';
import { MasterService } from '../../../core/services/master.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dropdown',
    templateUrl: './customDropdown.html',
    standalone: false,
})
export class CustomDropdownComponent {
  private _selectedValues: any;                     // To hold the selected dropdown values.
  // dropdownList: Array<ICustomDropdownData> = [];    // Drop downlist
  // @Input() dropdownList: Array<ICustomDropdownNCheckListData> = [];

  private _dropdownList: Array<ICustomDropdownNCheckListData> = [];
  @Input() dropdownDetails: DropdownDetails = new DropdownDetails();  // Dropdown properties
  @ViewChild('select') select: any;
  @Output() changeOfdropdownValue: EventEmitter<any> = new EventEmitter();    // For sending the data to parent
  @Output() onFocusEvent: EventEmitter<any> = new EventEmitter();
  labelData: AppLabel = { placeholder: this.dropdownDetails.labelText, inputValue: "" };
  @Input() isTableView: string = "NO";
  private _selectedItems: any;
  dropdownSearchCount = environment.showDropdownSearchIfCount;
  searchTerm: string = '';
  constructor() { }

  @Input() set dropdownList(val: Array<ICustomDropdownNCheckListData>) {
    this._dropdownList = val?.map(x => { x.displayData = x.item; return x; });

    if (this.dropdownList && !CommonMethods.hasValue(this.selectedValues) && this.dropdownDetails.viewType == "MNG") {
      if (this.dropdownList.length == 1 && this.dropdownDetails.canBind)
        this.bindDropdown();
      else if (this.dropdownDetails.alwaysBind) {
        this.bindDropdown();
      }
    }
    // this._dropdownList = val;

    if (CommonMethods.hasValue(this._selectedItems)) {
      this.labelData = { placeholder: this.dropdownDetails.labelText, inputValue: this._selectedItems.displayData }
    }
    else
      this.labelData = { placeholder: this.dropdownDetails.labelText, inputValue: this.getSelectedValues() }
  }

  get dropdownList() {
    return this._dropdownList;
  }

  bindDropdown() {
    const value = this.dropdownDetails.isValueID ? this.dropdownList[0].itemID : this.dropdownList[0].itemCode;
    this.changeOfdropdownValue.emit({ value: value, obj: this.dropdownList, text: this.dropdownList[0].item });
  }

  get showDrpItems() {
    var item: Array<ICustomDropdownNCheckListData> = [];

    if (!this.dropdownDetails.considerActiveItems)
      item = this.dropdownList;
    else if (this.dropdownList && this.dropdownList.length > 0) {

      item = this.dropdownList.filter((x: ICustomDropdownNCheckListData) => x.isActive);
      if (CommonMethods.hasValue(this._selectedValues, true)) {
        if (Array.isArray(this._selectedValues) && this.dropdownDetails.isMultiple) {
          this._selectedValues.forEach((x: any) => {
            if (!item.some(y => (this.dropdownDetails.isValueID ? y.itemID : y.itemCode) === x)) {
              var child = this.dropdownList.filter(y => ((this.dropdownDetails.isValueID ? y.itemID : y.itemCode) == x))
              if (child && child.length > 0)
                item.push(child[0]);
            }
          })
        }
      }
    }

    if (this.dropdownDetails.considerPlantwiseItems && item && item.length > 0)
      item = item.filter(x => x.plantID == this.dropdownDetails.plantID)

    return item;
  }

  get filteredDrpItems() {
    const searchLower = this.searchTerm.toLowerCase();
    if (CommonMethods.hasValue(this.showDrpItems))
      return this.showDrpItems.filter(item =>
        item?.item?.toLowerCase().includes(searchLower)
      );
    else
      return [];
  }

  /* For getting the selected values of  dropdown */
  get selectedValues() {
    return this._selectedValues;
  }

  /* For setting the values to dropdown and for selecting the select all checkbox */
  @Input('selectedValues') set selectedValues(val: any) {
    if (CommonMethods.hasValue(val) && this.dropdownDetails.isMultiple && CommonMethods.hasValue(val.items))
      this._selectedValues = val.items.map((x: any) => (this.dropdownDetails.isValueID ? x.itemID : x.itemCode));
    else
      this._selectedValues = val;

    if (this.dropdownList && this.dropdownList.length > 0)
      this.labelData = { placeholder: this.dropdownDetails.labelText, inputValue: CommonMethods.hasValue(this.selectedItems) ? this.selectedItems.displayData : this.getSelectedValues() }

    if (Array.isArray(val) && this.dropdownDetails.isMultiple && this.dropdownDetails.isShowSelectAll)
      this.dropdownDetails.isAllSelected = val.length == this.dropdownList.length;
  }

  @Input("selectedItems") set selectedItems(val: any) {

    this._selectedItems = val;

    if (CommonMethods.hasValue(this._selectedItems)) {
      if (CommonMethods.hasValue(val) && this.dropdownDetails.isMultiple && CommonMethods.hasValue(val.items)) {
        val.items.forEach((x: any) => {
          if (!this._dropdownList.some(y => y.itemID == x.itemID && y.itemCode == x.itemCode))
            this._dropdownList.push(x);
        });
      }
      else if (!this._dropdownList.some(x => x.itemID == this._selectedItems.itemID && x.itemCode == this._selectedItems.itemCode))
        this._dropdownList.push(this._selectedItems);
    }
  }

  setSelectedValue(val: string | number | null) {
    this._selectedValues = val;
  }

  /* To select or deselect  all the items in the dropdown at once. */
  selectAll() {
    if (this.dropdownDetails.isAllSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  onOptionClick(val: any) {
    let newStatus: boolean = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected)
        newStatus = false;
    });
    this.dropdownDetails.isAllSelected = newStatus;
  }


  /* For displaying selected values in label */
  getSelectedValues() {
    if (CommonMethods.hasValue(this._selectedValues) && this.dropdownList && this.dropdownList.length > 0) {
      if (Array.isArray(this._selectedValues) && this.dropdownDetails.isMultiple) {
        return this._selectedValues.map(x => {
          if (CommonMethods.hasValue(x))
            return this.dropdownList.filter(y => ((this.dropdownDetails.isValueID ? y.itemID : y.itemCode) ==
              (CommonMethods.isObjectValue(x) ? (this.dropdownDetails.isValueID ? x.itemID : x.itemCode) : x)))[0].item;
          else
            return "";
        }).join(', ');
      }
      else {
        if (this.dropdownList.filter(y => (this.dropdownDetails.isValueID ? y.itemID : y.itemCode) === this._selectedValues).length > 0)
          return this.dropdownList.filter(y => (this.dropdownDetails.isValueID ? y.itemID : y.itemCode) === this._selectedValues)[0].item;
        else
          return "";
      }
      // return this.dropdownList.filter(y => (y.itemID ? y.itemID : y.itemCode) === this._selectedValues)[0].item;
    }
    else
      return "N / A";
  }

  /* Dropdown Field Validation */
  validation(type: string = ""): any {
    if (!CommonMethods.hasValue(this._selectedValues) && (this.dropdownDetails.isMandatory || type == "SEARCH")) {
      if (!this.dropdownDetails.isMultiple)
        return CustomFieldMessages.singleDdwn + this.dropdownDetails.labelText.toLowerCase();
      else
        return CustomFieldMessages.multiDropdownvalue + this.dropdownDetails.labelText.toLowerCase();
    }
  }

  /* To get the value of selected dropdown value whenever the change is happend */
  changeOfValue(event: any) {
    let obj: Array<any> = [];
    this.selectedValues = event.value;
    this.labelData = { placeholder: this.dropdownDetails.labelText, inputValue: this.getSelectedValues() }
    if (CommonMethods.hasValue(event) && CommonMethods.hasValue(event.value) && this.dropdownList && this.dropdownList.length > 0) {
      if (!this.dropdownDetails.isMultiple)
        obj = this.dropdownList.filter(x => x.itemID == event.value);
      else {
        let data = this.dropdownList.filter(x => event.value.some((y: string) => (this.dropdownDetails.isValueID ? x.itemID : x.itemCode) == y));
        obj[0] = { items: data, displayData: this.getSelectedValues() };
      }
    }
    this.changeOfdropdownValue.emit({ value: event.value, obj: obj });
  }

  getSelectedObj(): Array<ICustomDropdownNCheckListData> {
    var selectedObj: Array<ICustomDropdownNCheckListData> = [];

    if (Array.isArray(this.selectedValues).valueOf()) {
      this.selectedValues.forEach((item: number | string) => {
        selectedObj = this.dropdownList.filter(x => x.itemID == item);
      })
    }
    else {
      selectedObj = this.dropdownList.filter(x => x.itemID == this.selectedValues);
    }
    return selectedObj;
  }

  focusEvent() {
    this.onFocusEvent.emit();
  }

  getClassFromPlaceholder(placeholder: string): string {
    return placeholder
      ? placeholder
        .replace(/\//g, '')
        .replace(/\./g, '-')    // Replace periods with hyphens
        .toLowerCase()          // Convert to lowercase
        .split(' ')             // Split by spaces
        .join('-')              // Join with hyphens
      : '';
  }

  clear() {
    Array.isArray(this.selectedValues) ? this.selectedValues = [] : this.selectedValues = "";
    this.changeOfdropdownValue.emit({ value: this.selectedValues, obj: "" });
  }
}
