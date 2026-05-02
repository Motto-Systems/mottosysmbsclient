import { Component, HostListener, Output, EventEmitter, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AppLabel } from '../customLabel/customLabelModal';
import { TextBoxInputs, TextBoxServiceUrls } from './customTextboxModal';
import { CommonMethods } from '../../utility/commonMethods';
import { CustomFieldMessages } from '../../utility/constant';
import { MasterService } from '../../../core/services/master.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-textbox',
    templateUrl: './customTextbox.html',
    standalone: false
})

export class CustomTextboxComponent implements AfterViewInit, OnDestroy {

    @Input() input: TextBoxInputs = new TextBoxInputs();  // we'll get input values from parent
    @Output('value') output: EventEmitter<string> = new EventEmitter(); // output to parent enter in input
    @Output() iconAction: EventEmitter<any> = new EventEmitter(); // output to parent enter in input

    @Input() isTableView: string = "NO";
    @Input() fieldType: string = "outline";
    @Input() isShowIcon: boolean = false;
    @Input() autoGeneratePasswordApplicable: string = "No";
    subscription$: Subscription = new Subscription();

    labelObj: AppLabel = { placeholder: this.input.placeholder, inputValue: this.inputValue, uom: this.input.uom }

    @ViewChild('formField') formField: any;


    private _inputValue: string = "";

    constructor(private _service: MasterService) { }

    ngOnInit() {
        this.labelObj = this.input;
    }

    ngAfterViewInit() {
        this.updateFieldType();
        this.subscription$ = this._service.subject$.subscribe(resp => {
            this.doAfterViewInit(resp);
        })
    }

    doAfterViewInit(resp: any) {
        switch (resp.purpose) {
            case "GeneratePassword_" + this.input.placeholder:
                this._inputValue = resp.result.referenceID;
                break;
        }
    }

    ngAfterViewChecked() {
        this.updateFieldType();
        this.labelObj.inputValue = this.inputValue;
    }

    updateFieldType() {
        if (CommonMethods.hasValue(this.formField))
            this.formField.appearance = this.fieldType;
    }

    @Input("inputValue") set inputValue(val: any) {
        this._inputValue = val;
    }

    get inputValue() {
        // if (!this._inputValue)
        //     this._inputValue = this.input.inputValue;

        return this._inputValue;
    }

    @HostListener('paste', ['$event'])
    @HostListener('drop', ['$event'])
    blockPaste(e: KeyboardEvent) {  //to remove paste values in the input
        if (!this.input.onPaste)
            e.preventDefault();
    }

    isEvent(evt: any) {     //key press event
        switch (this.input.inputType) {
            case "numeric":
                return this.isNumber(evt);

            case "decimal":
                return this.isDecimal(evt);

            case "alphabets":
                return this.isAlphabets(evt);

            case "alphaNumeric":
                return this.isallowAlphaNumericSpace(evt);
        }
        return;
    }

    isallowAlphaNumericSpace(e: any) {
        var code = ('charCode' in e) ? e.charCode : e.keyCode;
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            e.preventDefault();
        }
    }

    isNumber(evt: any) {   // to enter only number
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            if (evt.key == this.input.specialChar && evt.target.selectionStart == 0)
                return true;
            return false;
        }
        return true;
    }

    isDecimal(evt: any) {  //to enter only decimal
        return CommonMethods.allowDecimal(evt, this.input.maxLength, this.input.afterDecimal, this.input.beforeDecimal, this.input.specialChar);
    }

    isAlphabets(evt: any) {    // to enter only alphabets
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 32)
            return true;
        return false;
    }

    emitValues() {  // emit values
        if (typeof (this.inputValue) === "string")
            this.input.inputValue = this.inputValue.trim();

        this.labelObj.inputValue = this.input.inputValue;
        this.output.emit(this.input.inputValue);
    }

    onlyNumbers(type: string) {  // this is used to validate for copy and paste in field
        var notNumber: boolean = true;
        if (CommonMethods.hasValue(this.input.inputValue)) {
            if (type == "numeric") { // this is to validate pasted values has only numbers or not
                for (var i = 0; i < this.input.inputValue.length; i++) {
                    if (!(this.input.inputValue.charAt(i) >= "0" && this.input.inputValue.charAt(i) <= "9" || this.input.inputValue.charAt(i) == this.input.specialChar)) {
                        notNumber = false;
                        break;
                    }
                }
            }
            else if (type == "decimal") { // this is to validate pasted values has only numbers and decimal point or not
                for (var i = 0; i < this.input.inputValue.length; i++) {
                    if (!((this.input.inputValue.charAt(i) >= "0" && this.input.inputValue.charAt(i) <= "9") || this.input.inputValue.charAt(i) == "." || this.input.inputValue.charAt(i) == this.input.specialChar)) {
                        notNumber = false;
                        break;
                    }
                }
            }
            else if (type == "alphabets") {  // this is to validate pasted values has only alphabets or not
                for (var i = 0; i < this.input.inputValue.length; i++) {
                    if (this.input.inputValue.charAt(i) > "0" && this.input.inputValue.charAt(i) < "9") {
                        notNumber = false;
                        break;
                    }
                }
            }
            else if (type == "email") {
                if (CommonMethods.hasValue(this.input.inputValue)) {
                    if (this.input.inputValue.length > 0) {
                        let regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
                        if (!regExp.test(this.input.inputValue))
                            return false;
                    }
                }
            }
        }

        return notNumber;
    }

    validation(type: string = "") {  //validation messages
        var placeholder: string = this.input.placeholder.toLowerCase(); // placeholde to lower case
        var indexOfDecimal: number = -1;
        if (CommonMethods.hasValue(this.inputValue) && this.input.inputType == "decimal" && !Number.isInteger(this.inputValue))
            indexOfDecimal = this.inputValue?.indexOf("."); // finds the position of decimal point

        if ((this.input.isMandatory || type == "SEARCH") && !CommonMethods.hasValue(this.inputValue))
            return CustomFieldMessages.valueMessage + " " + placeholder;
        else if (this.input.inputType == "numeric" && !this.onlyNumbers(this.input.inputType))
            return CustomFieldMessages.numericMessage + " " + placeholder;
        else if (this.input.inputType == "numeric" && !this.input.allowZero && Number(this.inputValue) == 0)
            return CustomFieldMessages.valueGreaterThanzero + " " + placeholder;
        else if (this.input.inputType == "decimal" && !this.onlyNumbers(this.input.inputType))
            return CustomFieldMessages.numericMessage + " " + placeholder;
        else if (this.input.inputType == "decimal" && CommonMethods.hasValue(this.inputValue) && indexOfDecimal > -1 && (indexOfDecimal > this.input.beforeDecimal || this.inputValue.length - indexOfDecimal - 1 > this.input.afterDecimal))
            return CustomFieldMessages.decimal + " " + this.input.beforeDecimal + " digits before decimal and " + this.input.afterDecimal + " digits after decimal in " + placeholder;
        // else if (this.input.inputType == "decimal" && CommonMethods.hasValue(this.inputValue) && indexOfDecimal == -1 && this.inputValue.length > this.input.beforeDecimal)
        //     return CustomFieldMessages.invalidDecimal + placeholder;
        else if (this.input.inputType == "decimal" && !this.input.allowZero && Number(this.inputValue) == 0)
            return CustomFieldMessages.valueGreaterThanzero + " " + placeholder;
        else if (this.input.inputType == "alphabets" && !this.onlyNumbers("alphabets"))
            return CustomFieldMessages.validAlphabets + " " + placeholder;
        else if (this.input.inputType == "email" && !this.onlyNumbers("email"))
            return CustomFieldMessages.validEmail + " " + placeholder;

        if (CommonMethods.hasValue(this.input.minLength) && this.input.isMandatory && type != "SEARCH" &&
            (this.input.inputType == "all" || this.input.inputType == "alphaNumeric") && this.inputValue.trim().length < this.input.minLength)
            return CustomFieldMessages.minLength + " " + this.input.minLength + " characters for " + placeholder;

        return;
    }

    search() {
        this.emitValues();
        this.iconAction.emit(this.input.inputValue);
    }

    generatePassword() {
        this._service.getApiService(TextBoxServiceUrls.GeneratePassword, [], "GeneratePassword_" + this.input.placeholder)
    }

    toggleInputType(input:any): void {
        if (input.inputType === 'password') {
            input.inputType = 'text'; 
        } else if (input.inputType === 'text') {
            input.inputType = 'password'; 
        }
    }
    

    clear() {
        this.input.inputValue = this.inputValue = "";
        this.emitValues();
    }


    getClassFromPlaceholder(placeholder: string): string {
        return placeholder
          ? placeholder
              .replace(/\//g, '')
              .toLowerCase()          // Convert to lowercase
              .split(' ')             // Split by spaces
              .join('-')              // Join with hyphens
          : '';
      }
      

    ngOnDestroy(){
        this.subscription$.unsubscribe()
    }

}
