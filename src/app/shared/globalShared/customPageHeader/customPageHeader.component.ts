
import { Component, Input } from '@angular/core'
import { AppMaterialModule } from '../../../app.material.module';
import { AppContextService } from '../../../core/context/appContext.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { ViewHistoryComponent } from '../viewHistory/viewHistory.component';
import { CommonMethods } from '../../utility/commonMethods';
import { Router } from '@angular/router';
import { ApprovalComponent } from '../../../feature/approval/components/approval.component';
import { AlertService } from '../../../core/services/alert.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GLOBAL_CONSTANTS, MODE_TYPE } from '../../utility/constant';
import { ApprovalModule } from '../../../feature/approval/approval.module';

@Component({
  selector: 'custom-pageHead',
  templateUrl: './customPageHeader.html',
  standalone: true,
  imports: [AppMaterialModule, FlexLayoutModule, FontAwesomeModule, NgxSkeletonLoaderModule, ApprovalModule]
})

export class CustomPageHeaderComponent {

  @Input() pageTitle: string = "";
  @Input() status: string = "";
  @Input() refNo: string = "";

  isBackUrlDel: boolean = false;
  loading: boolean = true;
  currentHeaderTitle: string = "";
  isLoadTabSection: boolean = true;
  dynamicTabsSkeleton$: Subscription = new Subscription();
  pageMode: string = "";

  constructor(public _context: AppContextService, private _dialog: MatDialog,
    private _router: Router, private _alert: AlertService) {
  }


  confirmEvent() {
    if (this._context.pageHeaderInfo.confirmBO.basicInfoId <= 0) {
      this._alert.warning("Please save the request before confirm");
      return;
    }

    const dialogRef = this._dialog.open(ApprovalComponent, CommonMethods.modalPopupWidth('75'));
    dialogRef.componentRef?.setInput('approvalProcessObj', this._context.pageHeaderInfo.confirmBO);
    dialogRef.componentRef?.setInput('workflowMappingID', this._context.pageHeaderInfo.workflowMappingID);

  }

  viewHistory() {
    const dialogRef = this._dialog.open(ViewHistoryComponent, CommonMethods.modalPopupWidth('75'));

    dialogRef.componentRef?.setInput('basicInfoId', this._context.pageHeaderInfo.basicInfoId);
    dialogRef.componentRef?.setInput('workflowId', this._context.pageHeaderInfo.workflowID);

  }

  back() {
    if (CommonMethods.hasValue(this._context.pageHeaderInfo.backUrl))
      this._router.navigateByUrl(this._context.pageHeaderInfo.backUrl);

    const searchFormID = sessionStorage.getItem(GLOBAL_CONSTANTS.SRCH_FORM_ID) ?? "";
    if (searchFormID) {
      sessionStorage.setItem(GLOBAL_CONSTANTS.FORMS_ID, searchFormID);
      sessionStorage.removeItem(GLOBAL_CONSTANTS.SRCH_FORM_ID);
    }
  }

  uploadDocuments() {
    // UploadsComponent is not available in this build
  }

  viewReports() {
    // GenerateViewReportComponent is not available in this build
  }

  viewException() {
    // let containerBO: ExpContainerReqBO = new ExpContainerReqBO();
    // containerBO.moduleCode = String(sessionStorage.getItem("moduleCode"));
    // containerBO.referenceID = this._context.pageHeaderInfo.referenceID;
    // containerBO.referenceNumber = this._context.pageHeaderInfo.refNo;

    // const dialogRef = this._dialog.open(ExceptionComponent, CommonMethods.modalwidth75);
    // dialogRef.componentInstance.containerBO = containerBO;
  }


  ngOnDestroy(): void {
    this.dynamicTabsSkeleton$?.unsubscribe();
  }

}
