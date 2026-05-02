import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const approveRoutes: Routes = []

@NgModule({
    imports: [RouterModule.forChild(approveRoutes)],
    exports: [RouterModule]
})

export class ApprovalRoutingModule { }