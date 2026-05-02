import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMastersRoutingModule } from './userMastersRouting.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HelpersModule } from '../../shared/globalShared/globalShared.module';
import { CreateNewUserMasterComponent } from './components/createNewUserMaster/createNewUserMaster.component';
import { ListOfUserMastersComponent } from './components/listOfUserMasters/listOfUserMasters.component';



@NgModule({
  declarations: [
    ListOfUserMastersComponent,
    CreateNewUserMasterComponent,
  ],
  imports: [
    CommonModule,
    UserMastersRoutingModule,
    MatCardModule,
    FormsModule,
    HelpersModule,
    
  ]
})
export class UserMastersModule { }
