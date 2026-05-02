import { MouseHoverOut } from "../utility/directives/mouseHover";
import { ShowHideDirective } from "../utility/directives/showHideDirective";
import { SortPipe } from "../utility/pipe/sortPipe";
import { AdvanceSearchChipListComponent } from "./advanceSearchChipList/advanceSearchChipList.component";
import { SearchFilterModelComponent } from "./appAdvanceSearch/searchFilterModel.component";
import { AppCommonTemplateComponent } from "./appCommonTemplate/appCommonTemplate.component";
import { AppEditorComponent } from "./appEditor/appEditor.component";
import { AppFieldSkeletonLoaderComponent } from "./appFieldSkeletonLoader/appFieldSkeletonLoader.component";
import { AppGridComponent } from "./appGrid/appGrid.component";
import { AppLookupComponent } from "./appLookup/lookUp.component";
import { LookupGridComponent } from "./appLookup/lookupGrid.component";
import { AppModalPopupComponent } from "./appModalPopup/appModalPopup.component";
import { AppPaginationComponent } from "./appPagination/appPagination.component";
import { ConfirmDialogComponent } from "./confirmDialog/confirmDialog.component";
import { CustomButtonComponent } from "./customButton/customButton.component";
import { CustomChecklistComponent } from "./customCheckList/customCheckList.component";
import { CustomDateTimePickerComponent } from "./customDateTimePicker/customDateTimePicker.component";
import { CustomDropdownComponent } from "./customDropdown/customDropdown.component";
import { CustomSearchFieldsComponent } from "./customGridSearchFields/customGridSearchFields.component";
import { CustomLabelComponent } from "./customLabel/customLabel.component";
import { CustomLinkComponent } from "./customLink/customLink.component";
import { CustomLoaderComponent } from "./customLoader/customLoader.component";
import { FormatStringPipe } from "./customPipes/formatString.pipe";
import { CustomRemarkComponent } from "./customRemark/customRemarks.component";
import { CustomTextboxComponent } from "./customTextbox/customTextbox.component";
import { ErrorDialogComponent } from "./errorHandling/errorDialog.component";
import { GridSkeletonLoaderComponent } from "./gridSkeletonLoader/gridSkeletonLoader.component";
import { InfiniteScrollDirective } from "./infinite-scroll.directive";
import { MsplLookupComponent } from "./msplLookUp/lookUp.component";
import { MsplLookupGridComponent } from "./msplLookUp/lookupGrid.component";
import { NoDataAvailableComponent } from "./noDataAvailable/noDataAvailable.component";
import { BaseSearchComponent } from "./searchPage/baseSearch.component";
import { RevisionHistoryComponent } from "./viewHistory/components/revisionHistory/revisionHistory.component";

export const globalSharedComponents = [
    CustomDropdownComponent,
    CustomChecklistComponent,
    CustomButtonComponent,
    CustomDateTimePickerComponent,
    CustomLabelComponent,
    CustomTextboxComponent,
    ErrorDialogComponent,
    AppGridComponent,
    AppPaginationComponent,
    MouseHoverOut,
    ConfirmDialogComponent,
    AdvanceSearchChipListComponent,
    SearchFilterModelComponent,
    AppEditorComponent,
    BaseSearchComponent,
    // ViewHistoryComponent,
    AppLookupComponent,
    LookupGridComponent,
    AppModalPopupComponent,
    FormatStringPipe,
    InfiniteScrollDirective,
    ShowHideDirective,
    MsplLookupComponent,
    MsplLookupGridComponent,
    RevisionHistoryComponent,
    CustomLinkComponent,
    CustomRemarkComponent,
    SortPipe,
    GridSkeletonLoaderComponent,
    CustomSearchFieldsComponent,
    AppCommonTemplateComponent,
    AppFieldSkeletonLoaderComponent,
    NoDataAvailableComponent,
    CustomLoaderComponent
];
