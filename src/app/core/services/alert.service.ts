import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { ActionMessages } from "../../shared/utility/actionMessages";
import { CommonMethods } from "../../shared/utility/commonMethods";

@Injectable()

export class AlertService {

    constructor() { }

    prevMsg: string = "";

    success(str: string, isShowToasterMsg: boolean = true) {
        this.setMessage('success', str, "Success", isShowToasterMsg);
    }

    warning(str: string, isShowToasterMsg: boolean = true) {
        this.setMessage('warning', str, "Warning", isShowToasterMsg);
    }

    error(str: string, isShowToasterMsg: boolean = true) {
        this.setMessage('error', str, "Error", isShowToasterMsg);
    }
    info(str: string, isShowToasterMsg: boolean = true) {
        this.setMessage('info', str, "Info", isShowToasterMsg);
    }

    setMessage(type: any, str: string, title: string, isShowToasterMsg: boolean) {
      if(!isShowToasterMsg) {
        Swal.fire({
            title: title,
            html: str,
            timer: 5000,
            icon: type
        })
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 5000,
          title: title,
          text: str,
          icon: type
        });
      }
    }

    showDBMessage(code: string, extMessage: string = "", resultType: string = "") {
        let msg = ActionMessages.GetMessageByCode(code, extMessage);

        if (!CommonMethods.hasValue(msg))
            msg = code;

        if (code == "ERROR" || resultType == "ERROR")
            this.error(msg);
        else
            this.warning(msg);
    }

}