import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AppLabel } from './customLabelModal'
import { CommonMethods } from '../../utility/commonMethods';
import { FieldSkeletonBO } from '../appFieldSkeletonLoader/appFieldSkeletonLoaderModel';

@Component({
    selector: 'app-label',
    templateUrl: './customLabel.html',
    styleUrl: './customLabel.scss',
    providers: [CurrencyPipe, DatePipe],
    standalone: false
})

export class CustomLabelComponent {

    @Input() appLabel: AppLabel = new AppLabel();  // input required for app label to display placeholder and value
    @Input() isTableView: string = "NO";
    skeletonOptions: FieldSkeletonBO = { count: 2, options: [{ class: 'w-50', theme: { height: '25px' } }, { class: 'w-100', theme: { height: '10px' } }] };

    constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) {
    }

    getValue() { //this is used to return value which to be displayed under label
        if (!CommonMethods.hasValue(this.appLabel.uom) && !CommonMethods.hasValue(this.appLabel.valueType)) // if uom and value type is empty only value will return
            return CommonMethods.hasValue(this.appLabel.considerZero) ? CommonMethods.hasValueWithZero(this.appLabel.inputValue) ? String(this.appLabel.inputValue) : "" : this.appLabel.inputValue;
        else if (CommonMethods.hasValue(this.appLabel.uom)) // if uom is not empty value is concatnated with uom
            return CommonMethods.hasValue(this.appLabel.inputValue) ? this.appLabel.inputValue + " " + this.appLabel.uom : "N / A " + this.appLabel.uom;
        else if (CommonMethods.hasValue(this.appLabel.valueType)) // if valuetype is present then it will proceed to next method
            return this.getCondition();

        return;
    }

    getClassFromPlaceholder(placeholder: string): string {
        return placeholder
            ? placeholder
                .replace(/[\/()]/g, '')  // Remove / and ()
                .toLowerCase()          // Convert to lowercase
                .split(' ')             // Split by spaces
                .join('-')              // Join with hyphens
            : '';
    }

    getCondition() {  //this is used to pipe the input value

        if (!CommonMethods.hasValue(this.appLabel.inputValue))
            return;

        if (CommonMethods.hasValue(this.appLabel.pipeFormat)) {
            if (this.appLabel.valueType == "currency") // if value type is currency then the value is converted to corresponding currency format
                return this.currencyPipe.transform(this.appLabel.inputValue, this.appLabel.pipeFormat);
            else if (this.appLabel.valueType == "date") // if value type is date then the value is converted to corresponding date format
                return this.datePipe.transform(this.appLabel.inputValue, this.appLabel.pipeFormat)
        }
        return;
    }
}