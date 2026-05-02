import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AppLabel } from "../customLabel/customLabelModal";
import { CustomTextboxComponent } from "../customTextbox/customTextbox.component";
import { TextBoxInputs } from "../customTextbox/customTextboxModal";
import { CustomCheckListDetails, ICustomDropdownNCheckListData } from "./customChecklistModel";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { CommonMethods } from "../../utility/commonMethods";
import { CustomFieldMessages } from "../../utility/constant";

@Component({
    selector: 'app-checklist',
    templateUrl: './customCheckList.html',
    styleUrl: './customCheckList.scss',
    standalone: false
})

export class CustomChecklistComponent {

  // private _checklist: Array<ICustomDropdownData> = [];
  private _checklist: Array<ICustomDropdownNCheckListData> = [];
  @Input() singleCheckBoxDetails: ICustomDropdownNCheckListData = { itemID: 0, itemCode: "", item: "Test", isSelected: false, isDisabled: false };

  @Input() checklistDetails: CustomCheckListDetails = new CustomCheckListDetails(); // Custom checklist properties

  @Output() changeOfValue: EventEmitter<any> = new EventEmitter();                  // For sending the data to parent
  @Output() singleCheckBoxValue: EventEmitter<any> = new EventEmitter();
  @Input() list: Array<ICustomDropdownNCheckListData> = []     // For sending the data to parent
  @Input() chkID: string = "";
  textFieldDetails: TextBoxInputs = new TextBoxInputs("Others", 250);
  @ViewChild('textField') textField!: CustomTextboxComponent; // To access the fields and properties of textbox component
  @Input() type: string = "CHK_LIST";
  singleCheckBoxLabelData: AppLabel = { placeholder: this.checklistDetails.singleCheckBoxTile, inputValue: "" }
  multipleCheckBoxLabelData: AppLabel = { placeholder: this.checklistDetails.checklistHeading, inputValue: "" }
  labelData: AppLabel = { placeholder: this.checklistDetails.checklistHeading, inputValue: "" };

  constructor() { }

  /* For assigning list to checklist */
  @Input("checkList") set checklist(val: Array<ICustomDropdownNCheckListData>) {
    this._checklist = val.map(item => {
      if (!item.hasOwnProperty("isSelected"))
        item["isSelected"] = false;
      if (!item.hasOwnProperty("isDisabled"))
        item["isDisabled"] = false;
      return item;
    });

    // if (this._checklist.length > 0)
    //   this.checklistDetails.isSelectAllSelected = this._checklist.length == this._checklist.filter(x => x.isSelected).length;

    this._checklist.filter(item => {
      if (CommonMethods.hasValue(item.otherText) && item.itemCode == "OTH" && item.isSelected) {
        this.checklistDetails.isShowTextBox = true;
        this.textFieldDetails.inputValue = item.otherText;
      }
      else if (item.itemCode == "OTH" && !item.isSelected)
        this.checklistDetails.isShowTextBox = false;
    })
    if (this._checklist.length > 0)
      this.checklistDetails.isSelectAllSelected = this._checklist.length == this._checklist.filter(x => x.isSelected).length;

    this.textFieldDetails.maxLength = this.checklistDetails.otherTextLength;
    this.multipleCheckBoxLabelData.inputValue = this.getSelectedChecklistNames();

  }

  
  @Input('checklistValue') set checklistValue(val: any) {
    let options : any = [];
    if(val && val.options)
      options = val.options;
    else if(val)
      options = val;

    if (CommonMethods.hasValue(val) && (CommonMethods.hasValue(options) || CommonMethods.hasValue(options))) {
      if (CommonMethods.hasValue(options)) {
        options.forEach((x: any) => {
          let item = this.checklist.filter(a => a.itemID == x.ItemID);
          if (item && item.length > 0)
            item[0].isSelected = true;
        })
      }
      if (CommonMethods.hasValue(options)) {
        options.forEach((x: any) => {
          let item = this.checklist.filter(a => a.itemID == x.itemID);
          if (item && item.length > 0)
            item[0].isSelected = true;
        })
      }
    }
    else {
      this.checklist.map(x => x.isSelected = false);
    };
    // if (CommonMethods.hasValue(val)) {
    //   val.split(', ').forEach(x => {
    //     let item = this.checklist.filter(a => a.itemCode == x);
    //     if (item && item.length > 0)
    //       item[0].isSelected = true;
    //   })
    // }
    // else {
    //   this.checklist.map(x => x.isSelected = false);
    // }

    this.prepareLabel();
  }

  prepareLabel() {
    this.labelData = { placeholder: this.checklistDetails.checklistHeading, inputValue: this.getSelectedChecklistNames() };;
  }

  /* To get the checklist */
  get checklist() {
    this._checklist.forEach(x => x.id = x.itemID)
    return this._checklist;
  }

  /* To get selected checklist names */
  getSelectedChecklistNames() {

    if (!this.checklistDetails.isSingleCheckBox) {
      var otherItemData: string = "";
      this.checklist.filter(x => {
        if (x.isSelected && x.itemCode == "OTH")
          otherItemData = this.textFieldDetails.inputValue
      });
      var selecteditemsList = this._checklist.filter(x => x.isSelected && x.itemCode != "OTH").map(y => { return y.item }).join(", ");
      return (selecteditemsList && otherItemData) ? selecteditemsList + ", " + otherItemData : selecteditemsList ? selecteditemsList : otherItemData;
    }
    else
      return this.singleCheckBoxDetails.isSelected ? this.singleCheckBoxDetails.item : "N / A";
  }

  onCheckChange(obj: any, checked: any) {
    obj.isSelected = checked;
    this.checklistDetails.isSelectAllSelected = this._checklist.length == this._checklist.filter(x => x.isSelected).length;

    this.changeOfValue.emit(obj);

    /* For showing the textarea if other option is selected */
    if (obj.itemCode == 'OTH' && checked)
      this.checklistDetails.isShowTextBox = true;
    else if (obj.itemCode == 'OTH' && !checked) {
      this.textFieldDetails.inputValue = "";
      this.checklistDetails.isShowTextBox = false;
    }
  }

  /* For selecting all the checkboxes at once */
  onSelectAllChange(isChecked: boolean) {
    this._checklist.map(x => {
      x.isSelected = isChecked;
    });

    if (this._checklist.filter(x => x.itemCode == 'OTH').length > 0)
      this.checklistDetails.isShowTextBox = isChecked ? true : false;
  }

  singleCheckBoxChange(evt: any) {
    this.singleCheckBoxDetails.isSelected = evt.checked;
    this.singleCheckBoxValue.emit(this.singleCheckBoxDetails);
  }

  /* Checkboxes Validation */
  validation(): any {
    if (this._checklist.filter(x => x.isSelected).length == 0 && !this.checklistDetails.isSingleCheckBox) {
      return CustomFieldMessages.multiDropdownvalue + this.checklistDetails.checklistHeading.toLowerCase();
    }
    else if (!this.singleCheckBoxDetails.isSelected && this.checklistDetails.isSingleCheckBox) {
      return CustomFieldMessages.singleDdwn + " " + this.checklistDetails.singleCheckBoxTile.toLowerCase();
    }
    else if (this.checklistDetails.isShowTextBox)
      return this.textField.validation();
  }


  get showDrpItems() {
    var item: Array<ICustomDropdownNCheckListData> = [];
    if (!this.checklistDetails.considerActiveItems)
      item = this.checklist;
    // else
    //   item = this.checklist;

    else if (this.checklist && this.checklist.length > 0) {
      item = this.checklist.filter((x: ICustomDropdownNCheckListData) => x.isActive);
      if (CommonMethods.hasValue(this.checklist, true)) {

        var child = this.checklist.filter(y => (y.isActive == false && y.isSelected))
        if (child && child.length > 0)
          item.push(child[0]);
      }
    }

    if (this.checklistDetails.isPlantApp && item && item.length > 0)
      item = item.filter(x => x.plantID == this.checklistDetails.plantID)

    return item;
  }

  drop(event: CdkDragDrop<number>) {
    moveItemInArray(this.checklist, event.previousContainer.data, event.container.data);
    this.checklist.forEach((x, i) => x.itemOrder = i + 1);
    this._checklist = this._checklist.sort((x, y) => Number(x.itemOrder) - Number(y.itemOrder));
  }

}
