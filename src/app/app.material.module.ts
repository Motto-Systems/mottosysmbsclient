import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatChipsModule } from "@angular/material/chips";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatChipsModule,
        MatOptionModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatInputModule,
        MatSidenavModule,
        MatCardModule,
        MatIconModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatTableModule,
        MatTooltipModule,
        MatExpansionModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        DragDropModule,
        MatButtonToggleModule,
        MatPaginatorModule

    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatChipsModule,
        MatOptionModule,
        MatGridListModule,
        MatProgressBarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatInputModule,
        MatSidenavModule,
        MatCardModule,
        MatIconModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatTableModule,
        MatTooltipModule,
        MatExpansionModule,
        MatAutocompleteModule,
        DragDropModule,
        MatSortModule,
        MatButtonToggleModule,
        MatPaginatorModule
    ],
    providers: [
        { provide: MatDialogRef, useValue: MatDialogRef }
    ]
})
export class AppMaterialModule { }