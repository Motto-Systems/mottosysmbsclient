import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ListOfUserMastersComponent } from './components/listOfUserMasters/listOfUserMasters.component';
import { CreateNewUserMasterComponent } from './components/createNewUserMaster/createNewUserMaster.component';

export const userMastersRoutes: Routes = [

  { path: '', redirectTo: 'list', pathMatch: 'full' },

  {
    path: 'create',
    component: CreateNewUserMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userMastersRoutes)],
  exports: [RouterModule]
})
export class UserMastersRoutingModule { }