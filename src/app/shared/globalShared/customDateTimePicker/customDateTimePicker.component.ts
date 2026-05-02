import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateInputs } from './customDateTimePickerModal';
import { AppLabel } from '../customLabel/customLabelModal';
import { CommonMethods } from '../../utility/commonMethods';
import { CustomFieldMessages } from '../../utility/constant';
import { Subscription } from 'rxjs';
import { dateParserFormatter } from '../../utility/dateParserFormatter';
import { MasterService } from '../../../core/services/master.service';
import { environment } from '../../../../environments/environment';
import { CommonServiceUrls } from '../../utility/commonServiceUrls';

@Component({
    selector: 'app-datetimepicker',
    templateUrl: './customDateTimePicker.html',
    standalone: false
})

export class CustomDateTimePickerComponent {


    @Input() input: DateInputs = new DateInputs();  // these are inputs required from parent component to verify  which type of date details we need
    @Input() dateValue?: Date | null = new Date(""); // this is the date values which should be bind to our field
    @Input() dateRangeFrom: Date | null = new Date(""); // this is for date range from values
    @Input() dateRangeTo: Date | null = new Date(""); // this is for date range to values
    formattedDate: string | null = "";  //selected date values
    formattedRangeDateFrom: string | null = "";
    formattedRangeDateTo: string | null = "";
    @Output() onDateClick: EventEmitter<any> = new EventEmitter(); // send details to parent component
    isDateButtonClicked: boolean = false;
    @Input() timeValue: any;
    hour12Timer: any = "false" //false can show 24hrs

    appLabelForDate: AppLabel = new AppLabel(); // the property contains placeholder and values which should be displayed in label

    @Input() allowFutureEffectiveFrom: boolean = false;
    subscription$: Subscription = new Subscription();

    constructor(private _service: MasterService) { }

    ngAfterContentInit() {
        this.subscription$ = this._service.subject$.subscribe(resp => {
            if (resp.purpose == this.input.placeholder) {
                this.onDateClick.emit({
                    dateValue: dateParserFormatter.getConvertedDateTime(resp.result.currentDate, "Local"),
                    timeValue: dateParserFormatter.formatDate(dateParserFormatter.getConvertedDateTime(resp.result.currentDate, "Local"), 'time', "", "Not Consider"),
                    type: resp.type
                })
            }
        })

        this.bindDate();  // when ever input date details changes this method is called

        // console.log(this.dateValue);

    }

    ngOnChanges() {
        this.bindDate();
    }

    check(isDateButtonClicked: boolean = false) {  //when ever date picker value changes this method is called
        if (CommonMethods.hasValue(this.dateValue) && this.input.dateType != "range") {
            let convertDate: any;
            // Invalid Date -- Mahesh Babu Mutyala
            if (this.dateValue)
                convertDate = (this.dateValue.toString().split(" ").length <= 2) ? this.dateValue.toString().split(" ")[0] : this.dateValue;

            if (convertDate != "Invalid"){
                this.formattedDate = this.getDateFormat(convertDate);
                this.dateValue = CommonMethods.tranformIntoISODate(this.dateValue);
            }
        }
        else if ((CommonMethods.hasValue(this.dateRangeTo) || CommonMethods.hasValue(this.dateRangeFrom)) && this.input.dateType == "range") {
            this.formattedRangeDateFrom = this.getDateFormat(this.dateRangeFrom);
            this.formattedRangeDateTo = this.getDateFormat(this.dateRangeTo)
            this.formattedDate = this.formattedRangeDateFrom + " - " + this.formattedRangeDateTo;
        }
        this.isDateButtonClicked = isDateButtonClicked;
        this.emitDate();
    }

    clear() { // to clear field from parent component
        this.dateValue = this.dateRangeFrom = this.dateRangeTo = null;
        this.formattedDate = "";
        this.timeValue = null;
        this.emitDate();
    }

    getDateFormat(val: any) {  // formatting the date in given format 
        var formattedDate: string | null = "";
        if (this.input.formatType == "dateFormat" || this.input.formatType == "dateTimeFormat")
            formattedDate = CommonMethods.transformDate(val, this.input.formatType)
        else
            formattedDate = val;
        return formattedDate;
    }

    bindDate() { // binding date to fields

        if ((CommonMethods.hasValue(this.dateValue)) || (CommonMethods.hasValue(this.dateRangeFrom) && CommonMethods.hasValue(this.dateRangeTo)))
            this.check();
    }

    emitDate() { // emitting output result to parent component
        this.appLabelForDate = { placeholder: this.input.placeholder, inputValue: this.formattedDate }; // the label values are assigned here

        this.onDateClick.emit({
            dateValue: this.dateValue,
            formattedDate: this.formattedDate,
            timeValue: this.timeValue,
            formattedRangeDateFrom: this.formattedRangeDateFrom,
            formattedRangeDateTo: this.formattedRangeDateTo,
            isDateButtonClicked: this.isDateButtonClicked
        }) // emit the date values
    }


    validation(type: string = "") { // to validate the date field
        this.appLabelForDate.placeholder = this.input.placeholder;
        this.appLabelForDate.inputValue = this.formattedDate;
        if (this.input.isMandatory || type == "SEARCH") {
            if ((!CommonMethods.hasValue(this.dateValue) /*|| this.invalidDate(this.dateValue)*/) && (this.input.dateType == "date" || this.input.dateType == "dateTime" || this.input.dateType == "sysdatetime"))
                return CustomFieldMessages.date + " " + this.input.placeholder.toLowerCase();
            else if ((!CommonMethods.hasValue(this.dateRangeFrom) || !CommonMethods.hasValue(this.dateRangeTo)) && this.input.dateType == "range")
                return CustomFieldMessages.date + " " + this.input.placeholder.toLowerCase();
        }
        return;
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


    invalidDate(val: any) {
        // if invalid date; return true
        // console.log(this.dateValue);
        // console.log(Object.prototype.toString.call(val));
        return Object.prototype.toString.call(val) === '[object Date]';
    }

    getDateTime(type: string) {
        if (this.input.mode != "MNG")
            return;
        this._service.getApiService(CommonServiceUrls.getCurrentDateTime, [], type, environment.utilApiUrl);
    }
}