import { NgModule } from "@angular/core";
import { AppMaterialModule } from "../../app.material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HelpersModule } from "../globalShared/globalShared.module";
import { EnvironmentComponent } from "./environment/environment.component";
import { RouterOutlet } from "@angular/router";
import { CustomPageHeaderComponent } from "../globalShared/customPageHeader/customPageHeader.component";
import { AppHeaderComponent } from "../globalShared/appHeader/appHeader.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TodoListTableComponent } from "./todoList/todoListTable.component";
import { TodoListComponent } from "./todoList/todoList.component";
import { AppScanHeaderComponent } from "../globalShared/appScanHeader/appScanHeader.component";
import { ScannerEnvironmentComponent } from "./scannerEnvironment/scannerEnvironment.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";


@NgModule({
    declarations: [
        EnvironmentComponent,
        TodoListComponent,
        TodoListTableComponent,
        ScannerEnvironmentComponent
    ],
    imports: [
        AppMaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HelpersModule,
        RouterOutlet,
        CustomPageHeaderComponent,
        AppHeaderComponent,
        FontAwesomeModule,
        AppScanHeaderComponent,
        NgxSkeletonLoaderModule
    ],
    exports:[
        EnvironmentComponent
    ]
})

export class HomeModule { }