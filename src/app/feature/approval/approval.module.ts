import { NgModule } from "@angular/core";
import { HelpersModule } from "../../shared/globalShared/globalShared.module";
import { AppMaterialModule } from "../../app.material.module";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ApprovalComponent } from "./components/approval.component";

@NgModule({
    declarations: [
        ApprovalComponent,
    ],
    imports: [
        HelpersModule,
        AppMaterialModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        FontAwesomeModule,
    ],
    exports: [
        ApprovalComponent,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class ApprovalModule { }