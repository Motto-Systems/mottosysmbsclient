import { Directive, DoCheck, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2 } from '@angular/core';
import { CommonMethods } from '../commonMethods';
import * as _ from 'lodash';

@Directive({
    selector: '[msplShowHide]',
    standalone: false
})
export class ShowHideDirective implements OnChanges, DoCheck {

  @Input() msplShowHideConditionInfo: Array<any> = [];
  @Input() msplShowHideFormData: any = {};
  @Input() msplShowHideModuleData: any = {};
  @Input() msplShowHideControl: any// = new FieldControlBO();
  @Input() parentProperty: string = "componentData";
  @Input() msplShowHideMode: string = "MNG";
  @Input() msplShowHideIsDataGridExist: boolean = false;

  @Output() onControlHidden = new EventEmitter<boolean>();

  private previousFormData: any = {};
  private previousModuleData: any = {};
  private hideControl: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.checkCondition();
  }

  ngDoCheck(): void {
    if (this.hasFormDataChanged()) {
      this.checkCondition();
      this.previousFormData = { ...this.msplShowHideFormData }; // Deep copy for comparison
      this.previousModuleData = { ... this.msplShowHideModuleData };
    }
  }

  private checkCondition() {

    if(this.msplShowHideMode == "VIEW" && this.msplShowHideIsDataGridExist && this.msplShowHideControl.componentType != 'DataGrid'){
      this.hideControl = true;
      this.onControlHidden.emit(this.hideControl);
    }
    else if (this.msplShowHideConditionInfo && this.msplShowHideConditionInfo.length > 0 && CommonMethods.hasValue(this.msplShowHideControl?.id)
      && this.msplShowHideConditionInfo.some(x => x.field.itemID == this.msplShowHideControl.id)) {
      this.applyHideCondition();
      this.onControlHidden.emit(this.hideControl);
    }
    else{
      this.hideControl = false;
      this.onControlHidden.emit(this.hideControl);
    }
  }

  private applyHideCondition(): void {
    let hideConditions = this.msplShowHideConditionInfo.filter(x => x.isShow == 'No' && x.field.itemID == this.msplShowHideControl.id);

    if (hideConditions && hideConditions.length > 0) {
      let condition = this.getCondition(hideConditions);

      let result = this.evaluateShowHideCondition(condition, this.msplShowHideFormData, this.msplShowHideModuleData);

      if (result)
        this.hideControl = true;
      else
        this.applyShowCondition();
    }
    else
      this.applyShowCondition();
  }

  private applyShowCondition(): void {
    let showConditions = this.msplShowHideConditionInfo.filter(x => x.isShow == 'Yes' && x.field.itemID == this.msplShowHideControl.id);

    if (showConditions && showConditions.length > 0) {
      let condition = this.getCondition(showConditions);

      let result = this.evaluateShowHideCondition(condition, this.msplShowHideFormData, this.msplShowHideModuleData);

      if (!result)
        this.hideControl = true;
      else
        this.hideControl = false;
    }
    else
      this.hideControl = false;
  }

  private getCondition(conditions: Array<any>): string {
    let condition = `( ${conditions.map(x => { return x.conditionStrings }).join(") && (")} )`;
    return condition;
  }

  private evaluateShowHideCondition(conditionString: string, formData: any, moduleFormData: any): boolean {
    try {
      if (!CommonMethods.hasValue(this.parentProperty))
        this.parentProperty = "componentData";
      let moduleData: any = {};

      if (CommonMethods.hasValue(this.msplShowHideModuleData))
        moduleData = JSON.parse(JSON.stringify(moduleFormData));

      moduleData[this.parentProperty] = formData;

      const formattedCondition = conditionString.split(".").join("?.");
      const result = CommonMethods.executeDynamicCode(formattedCondition, moduleData);

      delete moduleData.componentData;
      return result;
    } catch (error) {
      return false;
    }
  }

  private hasFormDataChanged(): boolean {
    return (JSON.stringify(this.previousFormData) !== JSON.stringify(this.msplShowHideFormData) || JSON.stringify(this.previousModuleData) !== JSON.stringify(this.msplShowHideModuleData));
  }
}
