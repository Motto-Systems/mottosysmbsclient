import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "../../app.material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SearchFilterModalService } from "./advanceSearchChipList/service/searchFilterModelService.service";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ConfirmationService } from "../../core/services/confirmationService";
import { AppHttpService } from "../../core/services/http.service";
import { MasterService } from "../../core/services/master.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxEditorModule } from "ngx-editor";
import { OwlDateTimeModule, OwlNativeDateTimeModule, } from '@danielmoncada/angular-datetime-picker';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { MY_FORMATS } from "./customDateTimePicker/customDateTimePickerModal";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { globalSharedComponents } from "./globalShared.componentList";


@NgModule({
    declarations: [
        ...globalSharedComponents,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AppMaterialModule,
        FontAwesomeModule,
        AngularEditorModule,
        FlexLayoutModule,
        NgxEditorModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxSkeletonLoaderModule,

    ],
    exports: [
        ...globalSharedComponents
    ],
    providers: [
        CurrencyPipe, DatePipe,
        SearchFilterModalService,
        ConfirmationService,
        MasterService,
        AppHttpService,
        provideHttpClient(withInterceptorsFromDi()),
        provideMomentDateAdapter(MY_FORMATS),
    ]
})

export class HelpersModule { }
