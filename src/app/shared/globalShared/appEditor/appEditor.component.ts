import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { TextBoxInputs } from "../customTextbox/customTextboxModal";
import { CommonMethods } from "../../utility/commonMethods";
import { CustomFieldMessages } from "../../utility/constant";
import { AppLabel } from "../customLabel/customLabelModal";

@Component({
    selector: 'app-editor',
    templateUrl: './appEditor.html',
    standalone: false
})

export class AppEditorComponent {


    @Input() input: TextBoxInputs = new TextBoxInputs();
    
    @Output('value') output: EventEmitter<string> = new EventEmitter(); // output to parent enter in input
    labelObj: AppLabel = { placeholder: this.input.placeholder, inputValue: this.inputValue, uom: this.input.uom }
    @Input() isTableView: string = "NO";
    private _inputValue: string = "";
    mgMode : boolean = false;
    @Input("inputValue") set inputValue(val: any) {
        this._inputValue = val;
    }

    ngOnInit() {
        this.labelObj = this.input;
    }

    ngAfterViewChecked() {
        this.labelObj.inputValue = this.inputValue;
    }

    get inputValue() {
        // if (!this._inputValue)
        //     this._inputValue = this.input.inputValue;

        return this._inputValue;
    }

    get config() {
        let editorConfig: AngularEditorConfig = {
            editable: true,
            placeholder: this.input.placeholder,
            toolbarPosition: 'top'
        };

        return editorConfig;
    }

    emitValues() {  // emit values
        this.input.inputValue = this.inputValue;

        this.output.emit(this.input.inputValue);
    }

    validation(type: string = "") {  //validation messages
        var placeholder: string = this.input.placeholder.toLowerCase(); // placeholder to lower case

        if ((this.input.isMandatory || type == "SEARCH") && !CommonMethods.hasValue(this.inputValue))
            return CustomFieldMessages.valueMessage + " " + placeholder;

        if (CommonMethods.hasValue(this.input.minLength) && this.input.isMandatory && type != "SEARCH" && this.inputValue.trim().length < this.input.minLength)
            return CustomFieldMessages.minLength + " " + this.input.minLength + " characters for " + placeholder;

        return;
    }

    onDoubleClick(){
       this.mgMode = !this.mgMode
    }

    onEditorBlur(event: any) {
        this.mgMode = false;
        // Handle blur event here
      }

      @HostListener('keydown', ['$event'])
      onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Tab') {
          console.log('Moving to the next control');
        }
      }
}