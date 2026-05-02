import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../../app.material.module";
import { FormsModule } from "@angular/forms";
import { HelpersModule } from "../globalShared/globalShared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoaderComponent } from "../globalShared/loader/loader.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

export const BasicImports = [
    AppMaterialModule,
    CommonModule,
    FormsModule,
    HelpersModule,
    FlexLayoutModule,
    LoaderComponent,
    NgxSkeletonLoaderModule
];
