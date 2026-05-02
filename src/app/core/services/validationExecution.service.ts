import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CommonMethods } from "../../shared/utility/commonMethods";

// Stubs for removed sharedFeatures modules
class ValidateRulesDTO {
    isShowContent: boolean = false;
}

@Injectable()

export class ValidationExecutionService {

    ruleExecBO: ValidateRulesDTO = new ValidateRulesDTO();
    subject$: Subject<any> = new Subject<any>();

    constructor(private _modal: MatDialog) { }


    setValidateRuleObject(data: ValidateRulesDTO) {
        this.ruleExecBO = data;
    }

    setValidationRules(validation: any) {
        // ValidationRuleExecutionComponent is not available in this build
        return new Subject<any>().asObservable();
    }
}