import { VALUE_TYPE } from "../../utility/constant";

export class AppLabel {
    placeholder ?: string = "";
    inputValue : any;
    uom? : string = ""; 
    valueType? : VALUE_TYPE = "";
    pipeFormat? : string = "";
    considerZero?: boolean = false;
    constructor(placeholder : string = "", inputValue: string = ""){
        this.placeholder = placeholder;
        this.inputValue = inputValue;
    }
}